import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

/**
 *
 * @param address the address of the contract to load
 * @param ABI the ABI of the contract
 */
export default function useContract<T extends Contract = Contract>(
  address: string,
  ABI: any
): T | null {
  const { library, account, chainId } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library || !chainId) {
      // TODO: Do we really want to return null when we get such an error?
      return null;
    }

    // TODO: Do we really want to return null when we get such an error?
    try {
      return new Contract(address, ABI, library.getSigner(account));
    } catch (error) {
      console.error("Failed To Get Contract", error);

      return null;
    }
  }, [address, ABI, library, account]) as T;
}
