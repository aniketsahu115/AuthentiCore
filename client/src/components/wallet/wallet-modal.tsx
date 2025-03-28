import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { ExternalLink, LogOut } from "lucide-react";
import { truncateAddress } from "@/lib/utils";

interface WalletModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function WalletModal({ isOpen, setIsOpen }: WalletModalProps) {
  const { wallet, disconnectWallet, showWalletModal, setShowWalletModal, connecting, connectWallet, selectedWalletType, setSelectedWalletType } = useWallet();

  // Handle wallet selection modal state
  useEffect(() => {
    if (showWalletModal) {
      setIsOpen(true);
    }
  }, [showWalletModal, setIsOpen]);

  // Close both modals
  const handleClose = () => {
    setIsOpen(false);
    setShowWalletModal(false);
  };
  
  // Handle wallet disconnect
  const handleDisconnect = () => {
    disconnectWallet();
    handleClose();
  };
  
  // Handle wallet selection
  const handleSelectWallet = (walletType: string) => {
    console.log(`Selected wallet: ${walletType}`);
    setSelectedWalletType(walletType);
    // Delay the connection slightly to ensure the type is set
    setTimeout(() => {
      connectWallet();
    }, 50);
  };
  
  // If wallet is connected, show wallet info
  if (wallet && wallet.connected) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Wallet Connected</DialogTitle>
            <DialogDescription>
              Your wallet is connected to AuthentiCore platform.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Wallet Address</div>
                <div className="font-mono text-sm mt-1">{truncateAddress(wallet.address || "")}</div>
              </div>
              <a 
                href={`https://explorer.solana.com/address/${wallet.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button variant="destructive" onClick={handleDisconnect}>
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  
  // Otherwise, show wallet selection
  return (
    <Dialog open={isOpen || showWalletModal} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Select a wallet to connect to the AuthentiCore platform. You'll need a Solana wallet to register and verify products.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {connecting && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md">
              <p className="text-blue-700 dark:text-blue-300 text-sm flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Attempting to connect to wallet... Please check your browser extensions and approve the connection.
              </p>
            </div>
          )}
          
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-md">
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              You need to have the wallet extension installed in your browser. If you don't have one, you'll be connected to a mock wallet for demonstration purposes.
            </p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button
              variant="outline"
              className="w-full flex items-center justify-between px-4 py-6 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-200 dark:hover:border-purple-800 transition-colors"
              onClick={() => handleSelectWallet("phantom")}
              disabled={connecting}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white shadow-md">
                  <svg width="20" height="20" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M64 0C28.7 0 0 28.7 0 64c0 35.3 28.7 64 64 64s64-28.7 64-64C128 28.7 99.3 0 64 0zm0 121.6C32.2 121.6 6.4 95.8 6.4 64S32.2 6.4 64 6.4s57.6 25.8 57.6 57.6c0 31.8-25.8 57.6-57.6 57.6z" fill="white"/>
                    <path d="M96 49.8c-4.5-4.5-10.6-7-17-7H51.2c-2.6 0-4.8 2.1-4.8 4.8v58.8c0 2.6 2.1 4.8 4.8 4.8s4.8-2.1 4.8-4.8V82.2h23c6.4 0 12.5-2.5 17-7 4.5-4.5 7-10.6 7-17s-2.5-12.5-7-8.4zM91.9 70.2c-3.2 3.2-7.6 5-12.1 5H56V51.2h23.8c4.6 0 8.9 1.8 12.1 5 3.2 3.2 5 7.6 5 12.1s-1.8 8.9-5 12.1v-.2z" fill="white"/>
                  </svg>
                </div>
                <div className="ml-3">
                  <span className="font-medium block">Phantom</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Popular Solana wallet</span>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            
            <Button
              variant="outline"
              className="w-full flex items-center justify-between px-4 py-6 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
              onClick={() => handleSelectWallet("solflare")}
              disabled={connecting}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-md">
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm-6.7 23.5l3.2-3.2 3.2 3.2-3.2 3.2-3.2-3.2zm10.95-4.02L9.93 8.25l10.3-6.12 10.3 6.12-10.3 11.22zm-9.449-6.39l6.5 7.08 6.5-7.08-6.5-3.86-6.5 3.86z" fill="white"/>
                  </svg>
                </div>
                <div className="ml-3">
                  <span className="font-medium block">Solflare</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Non-custodial Solana wallet</span>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
