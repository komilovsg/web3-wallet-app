'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import WalletCard from '@/components/WalletCard';
import SendEthForm from '@/components/SendEthForm';
import ReceiveEth from '@/components/ReceiveEth';

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = (walletAddress: string, ethBalance: string) => {
    setAddress(walletAddress);
    setBalance(ethBalance);
    setIsConnected(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header isConnected={isConnected} address={address} />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Wallet Card */}
          <WalletCard
            onConnect={handleConnect}
            isConnected={isConnected}
            address={address}
            balance={balance}
            isLoading={isLoading}
          />

          {/* Send and Receive Grid */}
          {isConnected && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SendEthForm address={address} isConnected={isConnected} />
              <ReceiveEth address={address} isConnected={isConnected} />
            </div>
          )}

          {/* Info Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center text-gray-400">
            <p className="text-sm">
              💡 Make sure you have MetaMask installed and are on a testnet for testing
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
