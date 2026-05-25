# ETH Wallet - Web3 Interface

A simple, clean Ethereum wallet interface built with Next.js, TypeScript, TailwindCSS, and Web3.js. Connect with MetaMask to view your balance, send ETH, and receive ETH transfers.

## Features

✅ **Connect MetaMask Wallet** - Seamlessly connect your Web3 wallet  
✅ **Display Wallet Address** - View your Ethereum address with truncation  
✅ **Show ETH Balance** - Real-time balance display  
✅ **Send ETH** - Send Ethereum to any address with validation  
✅ **Receive ETH** - Display your address with one-click copy to clipboard  
✅ **Error Handling** - User-friendly error messages  
✅ **Loading States** - Visual feedback during transactions  
✅ **Dark Minimal UI** - Clean, responsive design with TailwindCSS  

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Web3.js** - Ethereum blockchain interaction
- **MetaMask** - Web3 wallet provider

## Prerequisites

- Node.js 18+ installed
- MetaMask browser extension installed
- Ethereum testnet account (e.g., Sepolia, Goerli) with test ETH

## Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd web3
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3002](http://localhost:3002) in your browser (or the port shown in terminal)

## Usage

### Connect Wallet
1. Click the **"Connect Wallet"** button
2. MetaMask will prompt you to select an account
3. Approve the connection request
4. Your wallet address and ETH balance will display

### Send ETH
1. Enter the recipient's Ethereum address (0x...)
2. Enter the amount of ETH to send
3. Click **"Send ETH"**
4. Confirm the transaction in MetaMask
5. Transaction hash will appear on success

### Receive ETH
1. Click **"Copy Address"** to copy your wallet address
2. Share this address with others to receive ETH transfers
3. Your balance updates automatically

## Project Structure

```
web3/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main page with app logic
│   └── globals.css          # Global styles
│
├── src/
│   ├── components/
│   │   ├── Header.tsx       # Header with address display
│   │   ├── WalletCard.tsx   # Wallet connection & balance
│   │   ├── SendEthForm.tsx  # Send transaction form
│   │   └── ReceiveEth.tsx   # Receive address section
│   │
│   ├── lib/
│   │   └── web3.ts          # Web3.js configuration & helpers
│   │
│   └── types/
│       └── index.ts         # TypeScript interfaces
│
├── package.json
├── tsconfig.json
└── next.config.ts
```

## API Reference

### Web3 Configuration (`src/lib/web3.ts`)

- `initWeb3()` - Initialize Web3 instance with MetaMask provider
- `getWeb3()` - Get existing Web3 instance
- `requestAccounts()` - Request user wallet connection
- `getBalance(address)` - Get ETH balance in Ether
- `sendTransaction(from, to, amount)` - Send ETH transaction
- `isValidAddress(address)` - Validate Ethereum address

## Features Implemented

### Step 1 ✅ Setup Project
- Next.js with TypeScript and TailwindCSS
- Web3.js dependency installed
- Development server running

### Step 2 ✅ Web3 Config
- Web3 initialization with MetaMask provider
- Window.ethereum detection
- Proper error handling

### Step 3 ✅ Wallet Connection
- MetaMask connection request
- Account selection
- Address state management
- Error handling for connection rejection

### Step 4 ✅ Display Wallet Info
- Wallet address display
- Real-time ETH balance using `getBalance()`
- Wei to Ether conversion

### Step 5 ✅ Send ETH Form
- Recipient address input with validation
- Amount input with step validation
- Transaction submission
- Error handling for insufficient balance
- Transaction hash display

### Step 6 ✅ Receive ETH Section
- Display current wallet address
- Copy to clipboard functionality
- "Copied" state feedback

### Step 7 ✅ UI Design
- Dark minimal theme (gray-950 background)
- Clean centered card layout
- Responsive grid for Send/Receive
- Good spacing and typography
- TailwindCSS styling

### Step 8 ✅ States & Validation
- Loading states with disabled buttons
- Error messages for all scenarios
- Empty field validation
- MetaMask missing detection
- Address format validation
- Amount validation

## Testing on Testnets

### Sepolia Testnet
1. Open MetaMask
2. Switch to Sepolia network
3. Get test ETH from [Sepolia Faucet](https://sepolia-faucet.pk910.de/)
4. Use the app to send and receive ETH

### Goerli Testnet (Deprecated)
Use Sepolia instead as Goerli is deprecated.

## Optional Enhancements

- ✨ Transaction link to Etherscan (optional - not implemented to keep MVP focused)
- ✨ Copy animation feedback (implemented - shows "✓ Copied!")
- ✨ Mobile responsive improvements (implemented with Tailwind)
- ✨ Truncated wallet address display (implemented)
- ✨ Success/error toast notifications

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Build for production

```bash
npm run build
npm start
```

## Important Notes

### Security
- This is a demo app for testnet only
- Never use with mainnet on test/untrusted machines
- Your private keys are managed by MetaMask, not this app
- Always verify transaction details before confirming

### Limitations
- Testnet only (not configured for mainnet)
- MetaMask required (no WalletConnect, Ledger, etc.)
- Single account connection at a time
- No transaction history

## Troubleshooting

### MetaMask not detected
- Ensure MetaMask extension is installed in your browser
- Check if it's enabled in your browser's extension settings
- Refresh the page

### "Insufficient balance" error
- Request more test ETH from the testnet faucet
- Make sure you're on the correct network

### Transaction fails
- Check gas prices aren't too high
- Ensure recipient address is valid (0x format)
- Verify amount is not higher than your balance

## What Was NOT Included (By Design)

✗ Redux or complex state management  
✗ Backend or database  
✗ Wagmi or RainbowKit (kept it simple with Web3.js)  
✗ Transaction history  
✗ Multiple wallet support  
✗ Advanced DeFi features  

## License

MIT & @komilovsg

## Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ for Web3 developers
