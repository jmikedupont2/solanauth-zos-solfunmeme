import { cn } from "@/lib/utils";
import { Wallet } from "@solana/wallet-adapter-react";
import Image from "next/image";

export const WalletIcon = ({ wallet }: { wallet: Wallet }) => (
  <Image
    src={wallet.adapter.icon}
    alt={wallet.adapter.name}
    className={cn(
      wallet.adapter.name.toLowerCase() === "ledger" ? "invert" : null,
    )}
    width={20}
    height={20}
  />
);
