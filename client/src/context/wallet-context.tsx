import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Wallet } from "@/types";
import { createMockWallet } from "@/lib/mock-wallet";

interface WalletContextType {
  wallet: Wallet | null;
  connecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  showWalletModal: boolean;
  setShowWalletModal: (show: boolean) => void;
  selectedWalletType: string | null;
  setSelectedWalletType: (type: string | null) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedWalletType, setSelectedWalletType] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    setConnecting(true);
    
    try {
      // Check if real wallet provider exists (Phantom, Solflare)
      const anyWindow = window as any;
      let walletProvider;
      
      if (selectedWalletType === "phantom" && anyWindow.phantom?.solana) {
        walletProvider = anyWindow.phantom.solana;
      } else if (selectedWalletType === "solflare" && anyWindow.solflare) {
        walletProvider = anyWindow.solflare;
      } else {
        // Use mock wallet for development
        walletProvider = createMockWallet(selectedWalletType || "phantom");
      }

      // Connect to wallet
      if (walletProvider) {
        try {
          await walletProvider.connect();
          
          if (walletProvider.publicKey || walletProvider.address) {
            const connectedWallet: Wallet = {
              connected: true,
              address: walletProvider.publicKey?.toString() || walletProvider.address,
              publicKey: walletProvider.publicKey?.toString() || walletProvider.address,
              connect: () => walletProvider.connect(),
              disconnect: () => walletProvider.disconnect(),
              signMessage: walletProvider.signMessage 
                ? (message: string) => walletProvider.signMessage(message)
                : undefined
            };
            
            setWallet(connectedWallet);
            setShowWalletModal(false);
          }
        } catch (error) {
          console.error("Error connecting to wallet:", error);
        }
      }
    } finally {
      setConnecting(false);
    }
  }, [selectedWalletType]);

  const disconnectWallet = useCallback(() => {
    if (wallet) {
      wallet.disconnect().catch(console.error);
      setWallet(null);
      setSelectedWalletType(null);
    }
  }, [wallet]);

  const value = {
    wallet,
    connecting,
    connectWallet,
    disconnectWallet,
    showWalletModal,
    setShowWalletModal,
    selectedWalletType,
    setSelectedWalletType
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  
  return context;
}
