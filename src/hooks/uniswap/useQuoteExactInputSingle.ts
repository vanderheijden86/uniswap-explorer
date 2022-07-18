import { Contract } from "@ethersproject/contracts";
import { BigNumberish } from "ethers";
import { Immutables } from "../../common/types";
import usePoolImmutables from "./usePoolImmutables";

export default async function useQuoteExactInputSingle(
  poolContract: Contract,
  quoterContract: Contract,
  amountIn: BigNumberish,
  sqrtPriceLimitX96: BigNumberish,
) {
  const immutables: Immutables = await usePoolImmutables(poolContract);

  return await quoterContract!!.callStatic.quoteExactInputSingle(
    immutables.token0,
    immutables.token1,
    immutables.fee,
    amountIn,
    sqrtPriceLimitX96);

}