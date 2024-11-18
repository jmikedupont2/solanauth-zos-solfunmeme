import { WalletConnectModal } from "@/components/modals/WalletConnectModal";
import { useBalance } from "@/hooks/useBalance";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { signIn } from "@/lib/auth/signin";
import { WalletName } from "@solana/wallet-adapter-base";
import { useConnection, useWallet, Wallet } from "@solana/wallet-adapter-react";
import { useAnimation } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { ConnectedWalletModal } from "./modals/ConnectedWalletModal";

export const ConnectionModal = () => {
  const { status } = useSession();
  const controls = useAnimation();
  const { publicKey, wallet, wallets, connected, signMessage } = useWallet();
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
    if (success) {
      await signOut({ redirect: false });
      setOpenWalletModal(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated" || status === "loading") {
      console.group("🔐 Authentication Status");
      console.log(
        "%cUnauthenticated: %cSignature pending",
        "font-weight: bold; color: #ff6b6b;",
        "color: #868e96;",
      );
      console.groupEnd();
    } else {
      console.group("🔐 Authentication Status");
      console.log(
        "%cAuthenticated: %cSignature confirmed",
        "font-weight: bold; color: #51cf66;",
        "color: #868e96;",
      );
      console.groupEnd();
    }
  }, [status]);

  useEffect(() => {
    if (!publicKey || !signMessage || status === "authenticated") return;

    const handleSigninMessage = async () => {
      try {
        await signIn(publicKey, signMessage);
      } catch (error) {
        console.error("Error during sign-in:", error);
      }
    };

    handleSigninMessage();
  }, [publicKey, signMessage, status, signIn]);

  if (connected && publicKey && signMessage) {
    return (
      <ConnectedWalletModal
        wallet={wallet as Wallet}
        publicKey={publicKey}
        balance={balance}
        onDisconnect={handleDisconnect}
        open={openWalletModal}
        onOpenChange={setOpenWalletModal}
        isConnecting={isConnecting}
        signMessage={signMessage}
        setOpenWalletModal={setOpenWalletModal}
        status={status}
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
