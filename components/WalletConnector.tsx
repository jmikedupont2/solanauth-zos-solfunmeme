import { WalletConnectModal } from "@/components/modals/WalletConnectModal";
import { useBalance } from "@/hooks/useBalance";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { WalletName } from "@solana/wallet-adapter-base";
import { useConnection, useWallet, Wallet } from "@solana/wallet-adapter-react";
import { useAnimation } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ConnectedWalletModal } from "./modals/ConnectedWalletModal";

export const ConnectionModal = () => {
  const controls = useAnimation();
  const { publicKey, wallet, wallets, connected } = useWallet();
  const [openConnectModal, setOpenConnectModal] = useState(false);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const { connection } = useConnection();
  const balance = useBalance(publicKey, connection);
  const { connectWallet, disconnectWallet, isConnecting } =
    useWalletConnection();

  const installedWallets = useMemo(
    () => wallets?.filter((wallet) => wallet.readyState === "Installed"),
    [wallets],
  );

  const uninstalledWallets = useMemo(
    () => wallets?.filter((wallet) => wallet.readyState !== "Installed"),
    [wallets],
  );

  const handleConnect = async (walletName: WalletName) => {
    const success = await connectWallet(walletName);
    if (success && connected) {
      setOpenConnectModal(false);
    }
  };

  const handleDisconnect = async () => {
    const success = await disconnectWallet();
    if (success) setOpenWalletModal(false);
  };

  if (connected && publicKey) {
    return (
      <ConnectedWalletModal
        wallet={wallet as Wallet}
        publicKey={publicKey}
        balance={balance}
        onDisconnect={handleDisconnect}
        open={openWalletModal}
        onOpenChange={setOpenWalletModal}
      />
    );
  }

  return (
    <WalletConnectModal
      controls={controls}
      installedWallets={installedWallets}
      uninstalledWallets={uninstalledWallets}
      onConnect={handleConnect}
      open={openConnectModal}
      onOpenChange={setOpenConnectModal}
      isConnecting={isConnecting}
    />
  );
};
