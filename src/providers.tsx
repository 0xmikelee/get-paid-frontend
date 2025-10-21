"use client";

import { ReactNode, useState } from "react";
import { WagmiProvider, type State } from "wagmi";
import { getConfig } from "@/wagmiconfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/app/components/Header";

// Create config once outside the component to ensure true singleton
const config = getConfig();

export const Providers = ({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <Header>{children}</Header>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
