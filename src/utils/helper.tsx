import TokenImageURI from "./tokenImageURI.json";
import { Token } from "../common/types";
import type { BigNumberish } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";


export const getFeeTierPercentage = (tier: string): number => {
  if (tier === "100") return 0.01 / 100;
  if (tier === "500") return 0.05 / 100;
  if (tier === "3000") return 0.3 / 100;
  if (tier === "10000") return 1 / 100;
  return 0;
};

export const getTokenLogoURL = (address: string): string => {
  const mapper = TokenImageURI as { [key: string]: string };
  const imageURL = mapper[address];

  if (imageURL) return imageURL;

  return `https://via.placeholder.com/30`;
};

export const sortToken = (token0: Token, token1: Token): Token[] => {
  if (token0.id < token1.id) {
    return [token0, token1];
  }
  return [token1, token0];
};

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

const ETHERSCAN_PREFIXES: Record<number, string> = {
  1: "",
  3: "ropsten.",
  4: "rinkeby.",
  5: "goerli.",
  42: "kovan.",
};

export function formatEtherscanLink(
  type: "Account" | "Transaction",
  data: [number, string]
) {
  switch (type) {
    case "Account": {
      const [chainId, address] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/address/${address}`;
    }
    case "Transaction": {
      const [chainId, hash] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${hash}`;
    }
  }
}

export const parseBalance = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);
