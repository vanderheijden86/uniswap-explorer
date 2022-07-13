import TokenImageURI from "./tokenImageURI.json";
import { Token } from "../common/types";

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
