import useSWR from "swr";
import type { IERC20 } from "../../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import useTokenContract from "./useTokenContract";

function getTokenBalance(contract: IERC20) {
  return async (_: string, address: string) => {
    const balance = await contract.balanceOf(address);

    return balance;
  };
}

export default function useTokenBalance(
  address: string,
  tokenAddress: string,
  suspense = false
) {
  const contract = useTokenContract(tokenAddress);

  const shouldFetch =
    typeof address === "string" &&
    typeof tokenAddress === "string" &&
    !!contract;

  const result = useSWR(
    shouldFetch ? ["TokenBalance", address, tokenAddress] : null,
    getTokenBalance(contract as IERC20),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
