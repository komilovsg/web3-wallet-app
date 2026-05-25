'use client';

import { useState } from 'react';
import { sendTransaction, isValidAddress } from '@/lib/web3';

interface SendEthFormProps {
  address: string | null;
  isConnected: boolean;
}

export default function SendEthForm({ address, isConnected }: SendEthFormProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setTxHash(null);

    // Validation
    if (!recipient.trim()) {
      setError('Please enter recipient address');
      return;
    }

    if (!isValidAddress(recipient)) {
      setError('Invalid Ethereum address');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter valid amount');
      return;
    }

    if (parseFloat(amount) > 1000) {
      setError('Amount seems too high, please verify');
      return;
    }

    if (!address) {
      setError('Wallet not connected');
      return;
    }

    setIsLoading(true);

    try {
      const hash = await sendTransaction(address, recipient, amount);
      setSuccess(true);
      setTxHash(hash);
      setRecipient('');
      setAmount('');
    } catch (error: any) {
      if (error.code === 4001) {
        setError('Transaction rejected by user');
      } else if (error.message?.includes('insufficient')) {
        setError('Insufficient balance');
      } else {
        setError('Transaction failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <p className="text-gray-400 text-center">Connect wallet to send ETH</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Send ETH</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            disabled={isLoading}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Amount (ETH)</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.1"
            disabled={isLoading}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 disabled:opacity-50"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {success && txHash && (
          <div className="bg-green-900 border border-green-700 rounded-lg p-3">
            <p className="text-green-300 text-sm mb-2">Transaction successful!</p>
            <p className="text-green-400 text-xs font-mono break-all">{txHash}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {isLoading ? 'Sending...' : 'Send ETH'}
        </button>
      </form>
    </div>
  );
}
