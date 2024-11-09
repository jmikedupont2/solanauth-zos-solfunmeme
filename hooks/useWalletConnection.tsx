import { WalletName } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useState } from "react";

export const useWalletConnection = () => {
  const { select, connect, disconnect, wallet } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = useCallback(
    async (walletName: WalletName, event?: React.MouseEvent) => {
      event?.preventDefault();
      event?.stopPropagation();

      setIsConnecting(true);
      try {
        if (!walletName) {
          throw new Error("No wallet name provided");
        }

        await select(walletName);
        await new Promise((resolve) => setTimeout(resolve, 100));

        let retryCount = 0;
        const maxRetries = 3;

        while (!wallet && retryCount < maxRetries) {
          await select(walletName);
          await new Promise((resolve) => setTimeout(resolve, 100));
          retryCount++;
        }

        if (!wallet) {
          throw new Error("Failed to select wallet after multiple attempts")
            .message;
        }

        await connect();
        return true;
      } catch (error) {
        console.error("Wallet connection error:", error);
        return false;
      } finally {
        setIsConnecting(false);
      }
    },
    [select, connect, wallet],
  );

  const disconnectWallet = useCallback(async () => {
    setIsConnecting(true);
    try {
      await disconnect();
      return true;
    } catch (error) {
      console.error("Wallet disconnect error:", error);
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, [disconnect]);

  return {
    connectWallet,
    disconnectWallet,
    isConnecting,
  };
};
