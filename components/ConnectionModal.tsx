import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { useGetBalance } from "@/hooks/useBalance";
import { WalletName } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useAnimation } from "framer-motion";
import { BadgeInfo, Check, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ConnectIcon } from "./icons/ConnectIcon";

export const ConnectionModal = () => {
  const controls = useAnimation();
  const { select, publicKey, disconnect, connect, wallet, wallets, connected } =
    useWallet();
  const [openConnectModal, setOpenConnectModal] = useState(false);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const { connection } = useConnection();
  const balance = useGetBalance(publicKey, connection);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const truncate = useMemo(() => {
    if (!publicKey) return "";
    const base58 = publicKey.toBase58();
    return `${base58.slice(0, 5)}•••${base58.slice(-5)}`;
  }, [publicKey]);

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const handleWalletAction = async (action: () => Promise<void>) => {
    setIsLoading(true);
    try {
      await action();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const connectWallet = useCallback(
    (walletName: WalletName) => {
      handleWalletAction(async () => {
        select(walletName);
        await connect();
        setOpenConnectModal(false);
      });
    },
    [select, connect],
  );

  const disconnectWallet = useCallback(() => {
    handleWalletAction(async () => {
      await disconnect();
      setOpenWalletModal(false);
    });
  }, [disconnect]);

  const copyAddress = useCallback(async () => {
    if (base58) {
      await navigator.clipboard.writeText(base58);
      setCopied(true);
      setTimeout(() => setCopied(false), 800);
    }
  }, [base58]);

  const installedWallets = useMemo(
    () => wallets?.filter((wallet) => wallet.readyState === "Installed"),
    [wallets],
  );

  const uninstalledWallets = useMemo(
    () => wallets?.filter((wallet) => wallet.readyState !== "Installed"),
    [wallets],
  );

  if (isLoading) {
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
      <Credenza open={openWalletModal} onOpenChange={setOpenWalletModal}>
        <CredenzaTrigger className="outline-none ring-0">
          <Button className="h-fit gap-2 rounded-full bg-primary font-semibold text-background">
            <Image
              src={wallet.adapter.icon}
              alt={wallet.adapter.name}
              width={20}
              height={20}
              loading="lazy"
            />
            <span>{truncate}</span>
          </Button>
        </CredenzaTrigger>
        <CredenzaContent className="flex flex-col justify-between gap-0 !rounded-3xl border bg-background text-foreground md:aspect-square md:max-w-[370px]">
          <CredenzaHeader className="w-full !text-center text-xl font-semibold">
            {wallet.adapter.name}
          </CredenzaHeader>
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
            <div className="flex flex-col items-center gap-2">
              <Image
                src={wallet.adapter.icon}
                alt="Wallet"
                width={70}
                height={70}
                loading="lazy"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-wider">
                {truncate}
              </span>
              <button
                onClick={copyAddress}
                className="flex items-center gap-1 text-sm transition-all"
              >
                {copied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>
            <p className="text-base font-semibold text-muted-foreground">
              {balance.toFixed(5)} SOL
            </p>
          </div>
          <div className="flex gap-2 max-md:p-4">
            <Button
              className="w-full rounded-full border-none bg-foreground font-semibold"
              onClick={disconnectWallet}
            >
              Disconnect Wallet
            </Button>
          </div>
        </CredenzaContent>
      </Credenza>
    );
  }

  return (
    <Credenza open={openConnectModal} onOpenChange={setOpenConnectModal}>
      <CredenzaTrigger asChild>
        <Button
          className="h-fit gap-2 rounded-full bg-primary font-semibold text-background hover:bg-foreground"
          onMouseEnter={() => controls.start("animate")}
          onMouseLeave={() => controls.start("normal")}
        >
          Connect Wallet
          <ConnectIcon controls={controls} />
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="h-fit gap-0 border bg-background p-0 text-white">
        <CredenzaHeader className="border-b border-primary/20 p-5">
          <CredenzaTitle className="font-semibold text-foreground">
            Connect Wallet
          </CredenzaTitle>
          <CredenzaDescription className="font-medium text-muted-foreground">
            You need to connect a Solana wallet.
          </CredenzaDescription>
        </CredenzaHeader>
        <div className="space-y-4 p-5">
          <h1 className="text-sm font-medium text-foreground">
            Installed Wallets
          </h1>
          <div className="xs:grid-cols-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {installedWallets.length > 0 ? (
              installedWallets.map((wallet) => (
                <Button
                  variant="ghost"
                  key={wallet.adapter.name}
                  onClick={() => connectWallet(wallet.adapter.name)}
                  className="flex aspect-square h-auto flex-col items-center justify-center gap-2 rounded-md border border-primary/10 transition-all hover:border-primary/60 hover:bg-primary/20"
                >
                  <Image
                    src={wallet.adapter.icon}
                    alt={wallet.adapter.name}
                    width={26}
                    height={26}
                  />
                  <span className="text-sm text-foreground">
                    {wallet.adapter.name}
                  </span>
                </Button>
              ))
            ) : (
              <p className="col-span-full text-center text-sm text-white/80">
                No wallet found. Please download a supported Solana wallet.
              </p>
            )}
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="moreWallets" className="border-0">
              <AccordionTrigger className="normal text-sm font-medium text-foreground">
                More Wallets
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pb-0">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {uninstalledWallets?.length > 0 &&
                    uninstalledWallets?.map((wallet) => (
                      <div key={wallet.adapter.name}>
                        <Link
                          href={wallet.adapter.url}
                          target="_blank"
                          className="flex w-full items-center gap-2 rounded-md border border-primary/10 p-3 transition-all hover:border-primary/60 hover:bg-primary/20"
                        >
                          <Image
                            src={wallet.adapter.icon}
                            alt={wallet.adapter.name}
                            width={26}
                            height={26}
                          />
                          <span className="font-medium text-foreground">
                            {wallet.adapter.name}
                          </span>
                        </Link>
                      </div>
                    ))}
                </div>
                <p className="flex items-center justify-center gap-2 py-3 text-xs text-foreground">
                  <BadgeInfo className="size-4" />
                  <span>
                    If you face errors, install the wallet before connecting.
                  </span>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CredenzaContent>
    </Credenza>
  );
};
