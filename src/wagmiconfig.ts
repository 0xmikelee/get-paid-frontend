import { createConfig, http, createStorage, cookieStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, walletConnect, metaMask } from "wagmi/connectors";

// Create a singleton config to prevent multiple WalletConnect initializations
let config: ReturnType<typeof createConfig> | null = null;

export const getConfig = () => {
  if (!config) {
    config = createConfig({
      chains: [mainnet, sepolia],
      transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
      },
      connectors: [
        injected(),
        metaMask(),
        walletConnect({
          projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
        }),
      ],
      storage: createStorage({
        storage: cookieStorage,
      }),
      ssr: true,
    });
  }
  return config;
};
