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
    setSelectedWalletType(walletType);
    connectWallet();
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
        
        <div className="py-4 flex flex-col space-y-3">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between px-4 py-6"
            onClick={() => handleSelectWallet("phantom")}
            disabled={connecting}
          >
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white">P</div>
              <span className="ml-3 font-medium">Phantom</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
          
          <Button
            variant="outline"
            className="w-full flex items-center justify-between px-4 py-6"
            onClick={() => handleSelectWallet("solflare")}
            disabled={connecting}
          >
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white">S</div>
              <span className="ml-3 font-medium">Solflare</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
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
