import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";
import { truncateAddress } from "@/lib/utils";
import WalletModal from "./wallet-modal";

export default function ConnectButton() {
  const { wallet, connecting, setShowWalletModal } = useWallet();
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = () => {
    setShowWalletModal(true);
  };

  return (
    <>
      {wallet && wallet.connected ? (
        <div className="flex items-center">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => setIsOpen(true)}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            {truncateAddress(wallet.address || "")}
          </Button>
        </div>
      ) : (
        <Button
          className="inline-flex items-center px-4 py-2"
          onClick={handleConnect}
          disabled={connecting}
        >
          <Wallet className="h-5 w-5 mr-2" />
          {connecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
      
      <WalletModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
