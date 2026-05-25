'use client';

import { useState, useEffect } from 'react';

interface ReceiveEthProps {
  address: string | null;
  isConnected: boolean;
}

export default function ReceiveEth({ address, isConnected }: ReceiveEthProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
    }
  };

  if (!isConnected || !address) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <p className="text-gray-400 text-center">Connect wallet to see receive address</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Receive ETH</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-400 text-sm mb-2">Your Address</p>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex items-center justify-between">
            <p className="text-white font-mono text-sm break-all flex-1">{address}</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {copied ? '✓ Copied!' : 'Copy Address'}
        </button>
        <p className="text-gray-400 text-xs text-center">
          Share this address to receive ETH from others
        </p>
      </div>
    </div>
  );
}
