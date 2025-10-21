import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { getConfig } from "@/wagmiconfig";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

// Create config once outside the component to ensure true singleton
const config = getConfig();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie");
  const initialState = cookieToInitialState(
    config,
    (await headers()).get("cookie")
  );

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
