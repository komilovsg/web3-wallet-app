export interface WalletState {
  address: string | null;
  balance: string | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface TransactionState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  txHash: string | null;
}
