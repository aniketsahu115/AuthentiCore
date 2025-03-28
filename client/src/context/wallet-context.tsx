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
    if (!selectedWalletType) {
      return;
    }
    
    setConnecting(true);
    
    try {
      // Check if real wallet provider exists (Phantom, Solflare)
      const anyWindow = window as any;
      let walletProvider;
      let useMockWallet = false;
      
      if (selectedWalletType === "phantom") {
        // Try to get Phantom wallet
        if (anyWindow.phantom?.solana) {
          console.log("Using Phantom wallet provider");
          walletProvider = anyWindow.phantom.solana;
        } else {
          console.log("Phantom wallet not found, using mock wallet");
          useMockWallet = true;
        }
      } else if (selectedWalletType === "solflare") {
        // Try to get Solflare wallet
        if (anyWindow.solflare) {
          console.log("Using Solflare wallet provider");
          walletProvider = anyWindow.solflare;
        } else {
          console.log("Solflare wallet not found, using mock wallet");
          useMockWallet = true;
        }
      }
      
      // Use mock wallet as fallback for development
      if (useMockWallet || !walletProvider) {
        console.log("Creating mock wallet for", selectedWalletType);
        walletProvider = createMockWallet(selectedWalletType);
      }

      // Connect to wallet
      if (walletProvider) {
        try {
          console.log("Attempting to connect to wallet...");
          await walletProvider.connect();
          
          // Check if successfully connected
          if (walletProvider.publicKey || walletProvider.address) {
            console.log("Successfully connected to wallet");
            
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
          } else {
            console.error("Wallet connection failed: No public key or address available");
          }
        } catch (error) {
          console.error("Error connecting to wallet:", error);
        }
      } else {
        console.error("No wallet provider available");
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
