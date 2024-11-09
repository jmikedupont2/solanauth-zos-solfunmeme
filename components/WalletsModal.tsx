import { WalletConnectModal } from "@/components/modals/WalletConnectModal";
import { useGetBalance } from "@/hooks/useBalance";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { Button } from "@/ui/button";
import { WalletName } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useAnimation } from "framer-motion";
import { useMemo, useState } from "react";
import { ConnectedWalletModal } from "./modals/ConnectedWalletModal";

export const ConnectionModal = () => {
  const controls = useAnimation();
  const { publicKey, wallet, wallets, connected } = useWallet();
  const [openConnectModal, setOpenConnectModal] = useState(false);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const { connection } = useConnection();
  const balance = useGetBalance(publicKey, connection);
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
    if (success) setOpenConnectModal(false);
  };

  const handleDisconnect = async () => {
    const success = await disconnectWallet();
    if (success) setOpenWalletModal(false);
  };

  if (isConnecting) {
    return (
      <Button
        disabled
        className="h-fit gap-2 rounded-full bg-primary font-semibold text-background"
      >
        <span>Connecting...</span>
      </Button>
    );
  }

  if (connected && wallet && publicKey) {
    return (
      <ConnectedWalletModal
        wallet={wallet}
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
    />
  );
};
