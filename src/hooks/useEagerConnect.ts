import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { injected } from "../common/config";

/**
 *  Gets the Web3ReactContext and tries to connect to the blockchain network
 *  available inside the Context.
 *  @return boolean indicating if an attempt to connect has already been made
 */
export default function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    // when the chainId the user tries to connect to is supported, then activate.
    // If either succeeds/fails indicate we tried.
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate]);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  // In case we haven't tried yet, but connection is already active set tried to true.
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
