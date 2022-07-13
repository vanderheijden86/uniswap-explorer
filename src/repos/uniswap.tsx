import axios from "axios";
import { getTokenLogoURL, sortToken } from "../utils/helper";
import { NETWORKS } from "../common/config";
import { Pool, Tick, Token } from "../common/types";

let subgraphEndpoint = NETWORKS[0].subgraphEndpoint;

export const updateSubgraphEndpoint = (newEndpoint: string) => {
  subgraphEndpoint = newEndpoint;
};

const queryUniswap = async (query: string): Promise<any> => {
  const { data } = await axios({
    url: subgraphEndpoint,
    method: "post",
    data: {
      query,
    },
  });

  return data.data;
};

export const getPools = async (): Promise<Pool[]> => {
  // to achieve the same sorting as here https://info.uniswap.org/#/pools
  const { pools } = await queryUniswap(`{    
    pools (first: 10, orderBy: totalValueLockedUSD, orderDirection: desc, where: {volumeUSD_gt: 0 }) {
      id,
      token0 {id, symbol, name},
      token1 {id, symbol, name},
      feeTier,
      liquidity,
      token0Price,
      token1Price,
      volumeUSD,
      totalValueLockedETH,
      totalValueLockedUSD    
    }
  }`);

  return pools as Pool[];
};

export const getVolume24H = async (poolAddress: string): Promise<number> => {
  const { poolDayDatas } = await queryUniswap(`{
    poolDayDatas(skip: 1, first:3, orderBy: date, orderDirection: desc, where:{pool: "${poolAddress}"}) {
      volumeUSD
    }
  }`);

  const data = poolDayDatas.map((d: { volumeUSD: string }) =>
    Number(d.volumeUSD),
  );

  return (
    data.reduce((result: number, curr: number) => result + curr, 0) /
    data.length
  );
};

export const getPoolTicks = async (poolAddress: string): Promise<Tick[]> => {
  const { ticks } = await queryUniswap(`{
    ticks(first: 1000, skip: 0, where: { poolAddress: "${poolAddress}" }, orderBy: tickIdx) {
      tickIdx
      liquidityNet
      price0
      price1
    }
  }`);

  return ticks as Tick[];
};


const _getTokenList = async (
  result: Token[],
  page: number = 0,
): Promise<Token[]> => {
  const res = await queryUniswap(`{
    tokens(skip: ${page * 1000}, first: 1000, orderBy: id) {
      id
      name
      symbol
      volumeUSD
      decimals
    }
  }`);

  if (res === undefined || res.tokens.length === 0) {
    return result;
  }

  result = [...result, ...res.tokens];
  return await _getTokenList(result, page + 1);
};
export const getTokenList = async (): Promise<Token[]> => {
  const tokens = await _getTokenList([]);
  return tokens
    .map((token) => {
      token.logoURI = getTokenLogoURL(token.id);
      return token;
    })
    .map((token) => {
      if (token.name === "Wrapped Ether" || token.name === "Wrapped Ethereum") {
        token.name = "Ethereum";
        token.symbol = "ETH";
        token.logoURI =
          "https://cdn.iconscout.com/icon/free/png-128/ethereum-2752194-2285011.png";
      }
      if (token.name === "Wrapped Matic") {
        token.name = "Polygon Native Token";
        token.symbol = "MATIC";
      }
      return token;
    })
    .filter((token) => token.symbol.length < 30)
    .sort((a, b) => Number(b.volumeUSD) - Number(a.volumeUSD));
};

export const getPoolFromPair = async (
  token0: Token,
  token1: Token,
): Promise<Pool[]> => {
  const sortedTokens = sortToken(token0, token1);

  const { pools } = await queryUniswap(`{
    pools(orderBy: feeTier, where: {
        token0: "${sortedTokens[0].id}",
        token1: "${sortedTokens[1].id}"}) {
      id
      tick
      sqrtPrice
      feeTier
      liquidity
      token0Price
      token1Price
    }
  }`);

  return pools as Pool[];
};