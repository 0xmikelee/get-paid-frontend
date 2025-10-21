"use client";
import { useConnect, useAccount, injected, useDisconnect } from "wagmi";
import Link from "next/link";

export const Header = ({ children }: { children: React.ReactNode }) => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  return (
    <>
      <nav className="flex justify-between items-center p-4 sticky top-0 z-50 left-0 right-0 bg-green-200">
        <Link href="/">
          <p className="text-2xl">Get Paid</p>
        </Link>
        <div className="flex flex-col justify-center items-center gap-4">
          {!isConnected ? (
            <button onClick={() => connect({ connector: injected() })}>
              Connect Wallet
            </button>
          ) : (
            <>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer text-xs"
                onClick={() => disconnect()}
              >
                {address}
              </button>
            </>
          )}
        </div>
      </nav>
      {children}
    </>
  );
};
