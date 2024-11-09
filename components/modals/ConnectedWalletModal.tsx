import { Wallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import { WalletIcon } from "../icons/WalletIcon";
import { Button } from "../ui/button";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "../ui/credenza";
import { WalletAddress } from "../ui/wallet-address";

type ConnectedWalletModalProps = {
  wallet: Wallet;
  publicKey: PublicKey;
  balance: number;
  onDisconnect: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ConnectedWalletModal = ({
  wallet,
  publicKey,
  balance,
  onDisconnect,
  open,
  onOpenChange,
}: ConnectedWalletModalProps) => (
  <Credenza open={open} onOpenChange={onOpenChange}>
    <CredenzaTrigger className="outline-none ring-0">
      <Button className="h-fit gap-2 rounded-full bg-primary font-semibold text-background">
        <WalletIcon wallet={wallet} />
        <WalletAddress
          publicKey={publicKey}
          size="sm"
          className="text-background"
          showCopyButton={false}
        />
      </Button>
    </CredenzaTrigger>
    <CredenzaContent className="flex flex-col justify-between gap-0 !rounded-3xl border bg-background text-foreground md:aspect-square md:max-w-[370px]">
      <CredenzaHeader className="w-full !text-center text-xl font-semibold">
        <CredenzaTitle>{wallet.adapter.name}</CredenzaTitle>
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
        <WalletAddress
          publicKey={publicKey}
          size="lg"
          className="mb-2"
          showCopyButton={true}
        />
        <p className="text-base font-semibold text-muted-foreground">
          {balance.toFixed(5)} SOL
        </p>
      </div>
      <div className="flex gap-2 max-md:p-4">
        <Button
          className="w-full rounded-full border-none bg-foreground font-semibold"
          onClick={onDisconnect}
        >
          Disconnect Wallet
        </Button>
      </div>
    </CredenzaContent>
  </Credenza>
);
