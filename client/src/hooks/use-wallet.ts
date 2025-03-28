import { useWallet as useWalletFromContext } from "@/context/wallet-context";

export function useWallet() {
  return useWalletFromContext();
}
