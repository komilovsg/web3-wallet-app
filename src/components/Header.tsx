'use client';

import { useEffect, useState } from 'react';

interface HeaderProps {
  isConnected: boolean;
  address: string | null;
}

export default function Header({ isConnected, address }: HeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="border-b border-gray-800 bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          <span className="text-blue-500">Ξ</span> ETH Wallet
        </h1>
        {mounted && isConnected && address && (
          <div className="flex items-center gap-3 bg-gray-900 px-3 py-2 rounded-lg border border-gray-800">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-300">{truncateAddress(address)}</span>
          </div>
        )}
      </div>
    </header>
  );
}
