import ERC20_ABI from "../../contracts/ERC20.json";
import type { IERC20 } from "../../contracts/types";
import useContract from "./useContract";

export default function useTokenContract(tokenAddress?: string) {
  return useContract<IERC20>(tokenAddress as string, ERC20_ABI);
}
