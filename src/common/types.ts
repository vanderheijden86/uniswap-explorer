import { ethers } from "ethers";

export interface Network {
  id: string;
  name: string;
  desc: string;
  logoURI: string;
  disabled?: boolean;
  subgraphEndpoint: string;
}

export interface Token {
  id: string;
  name: string;
  symbol: string;
  volumeUSD: string;
  logoURI: string;
  decimals: string;
}

export interface Pool {
  id: string;
  token0: Token;
  token1: Token;
  feeTier: string;
  liquidity: string;
  token0Price: string;
  token1Price: string;
  volumeUSD: bigint;
  totalValueLockedETH: bigint;
  totalValueLockedUSD: bigint;
  tick: string;
  sqrtPrice: string;
}

export interface Tick {
  tickIdx: string;
  liquidityNet: string;
  price0: string;
  price1: string;
}

export interface Immutables {
  factory: string
  token0: string
  token1: string
  fee: number
  tickSpacing: number
  maxLiquidityPerTick: ethers.BigNumber
}

