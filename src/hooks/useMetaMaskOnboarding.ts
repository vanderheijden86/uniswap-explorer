import detectEthereumProvider from "@metamask/detect-provider";
import type MetaMaskOnboarding from "@metamask/onboarding";
import { useEffect, useRef, useState } from "react";

/**
 * Checks if  MetaMask is installed and returns functions to start or stop the Onboarding process
 * for MetaMask
 */
export default function useMetaMaskOnboarding() {
  const onboarding = useRef<MetaMaskOnboarding>();

  const [isMetaMaskInstalled, isMetaMaskInstalledSet] = useState<boolean>();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    async function checkForMetaMask() {
      const provider = await detectEthereumProvider({
        timeout: 1000,
        mustBeMetaMask: true,
      });

      if (provider) {
        isMetaMaskInstalledSet(true);
      } else {
        isMetaMaskInstalledSet(false);
      }
    }

    checkForMetaMask();
  }, []);

  async function startOnboarding() {
    // only import library when needed (dynamic import)
    const MetaMaskOnboarding = await import("@metamask/onboarding").then(
      (m) => m.default
    );

    onboarding.current = new MetaMaskOnboarding();

    onboarding.current?.startOnboarding();
  }

  function stopOnboarding() {
    if (onboarding?.current) {
      onboarding.current.stopOnboarding();
    }
  }

  const isWeb3Available = typeof window !== "undefined" && window?.ethereum;

  return {
    startOnboarding,
    stopOnboarding,
    isMetaMaskInstalled,
    isWeb3Available,
  };
}
