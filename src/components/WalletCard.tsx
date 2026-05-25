'use client';

import { useState, useEffect } from 'react';
import { requestAccounts, getBalance, initWeb3 } from '@/lib/web3';

interface WalletCardProps {
  onConnect: (address: string, balance: string) => void;
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  isLoading: boolean;
}

export default function WalletCard({
  onConnect,
  isConnected,
  address,
  balance,
  isLoading,
}: WalletCardProps) {
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    initWeb3();
  }, []);

  const handleConnect = async () => {
    setLocalError(null);
    try {
      const accounts = await requestAccounts();
      if (accounts.length > 0) {
        const selectedAddress = accounts[0];
        const ethBalance = await getBalance(selectedAddress);
        onConnect(selectedAddress, ethBalance);
      }
    } catch (error: any) {
      if (error.code === 4001) {
        setLocalError('Connection rejected by user');
      } else if (error.message === 'MetaMask is not installed') {
        setLocalError('Please install MetaMask');
      } else {
        setLocalError('Failed to connect wallet');
      }
    }
  };

  if (isConnected && address && balance !== null) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">Wallet Address</p>
            <p className="text-white font-mono text-lg break-all">{address}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">ETH Balance</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-blue-400">{parseFloat(balance).toFixed(4)}</p>
              <p className="text-gray-400">ETH</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="text-center space-y-4">
        <div>
          <p className="text-gray-400 mb-2">Connect your MetaMask wallet to get started</p>
        </div>
        <button
          onClick={handleConnect}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
        {localError && (
          <p className="text-red-500 text-sm">{localError}</p>
        )}
      </div>
    </div>
  );
}
