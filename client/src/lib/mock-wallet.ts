import { Wallet } from "@/types";
import { nanoid } from "nanoid";

interface MockWalletProvider {
  connected: boolean;
  address: string;
  publicKey: string;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signMessage: (message: string) => Promise<string>;
}

/**
 * Create a mock wallet for development purposes
 */
export function createMockWallet(type: string): MockWalletProvider {
  const mockAddress = `mock${nanoid(8)}`;
  let connected = false;
  
  return {
    get connected() {
      return connected;
    },
    get address() {
      return connected ? mockAddress : "";
    },
    get publicKey() {
      return connected ? mockAddress : "";
    },
    connect: async () => {
      connected = true;
      return Promise.resolve();
    },
    disconnect: async () => {
      connected = false;
      return Promise.resolve();
    },
    signMessage: async (message: string) => {
      if (!connected) {
        throw new Error("Wallet not connected");
      }
      return Promise.resolve(`sig-${nanoid(12)}`);
    }
  };
}
