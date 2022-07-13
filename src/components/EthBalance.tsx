import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import useETHBalance from "../hooks/useETHBalance";
import { parseBalance } from "../utils/helper";


export default function EthBalance() {
  const { account } = useWeb3React<Web3Provider>();
  const { data } = useETHBalance(account as string);

  return <span><strong>Balance &nbsp;</strong> Ξ{parseBalance(data ?? 0)}</span>
}