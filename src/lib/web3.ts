import Web3 from 'web3';

let web3Instance: Web3 | null = null;

export const initWeb3 = (): Web3 | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (window.ethereum) {
    web3Instance = new Web3(window.ethereum);
    return web3Instance;
  }

  return null;
};

export const getWeb3 = (): Web3 | null => {
  if (web3Instance) {
    return web3Instance;
  }
  return initWeb3();
};

export const requestAccounts = async (): Promise<string[]> => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    }) as string[];
    return accounts;
  } catch (error) {
    throw error;
  }
};

export const getBalance = async (address: string): Promise<string> => {
  const web3 = getWeb3();
  if (!web3) {
    throw new Error('Web3 is not initialized');
  }

  try {
    const balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, 'ether');
  } catch (error) {
    throw error;
  }
};

export const sendTransaction = async (
  from: string,
  to: string,
  amount: string
): Promise<string> => {
  const web3 = getWeb3();
  if (!web3) {
    throw new Error('Web3 is not initialized');
  }

  try {
    const amountInWei = web3.utils.toWei(amount, 'ether');
    const tx = await web3.eth.sendTransaction({
      from,
      to,
      value: amountInWei,
    });
    return tx.transactionHash as string;
  } catch (error) {
    throw error;
  }
};

export const isValidAddress = (address: string): boolean => {
  const web3 = getWeb3();
  if (!web3) {
    return false;
  }
  return web3.utils.isAddress(address);
};

declare global {
  interface Window {
    ethereum?: any;
  }
}
