import { WalletIcon } from "@/components/icons/WalletIcon";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { WalletName } from "@solana/wallet-adapter-base";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { BorderTrail } from "./border-tail";

type WalletListProps = {
  wallets: Wallet[];
  onSelect: (name: WalletName) => void;
  type: "installed" | "uninstalled";
};

export const WalletList = ({ wallets, onSelect, type }: WalletListProps) => {
  const { wallet: selectedWallet } = useWallet();
  if (type === "installed") {
    return (
      <div className="xss:grid-cols-3 grid grid-cols-2 gap-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-4">
        {wallets.length > 0 ? (
          wallets.map((wallet) => (
            <Button
              variant="ghost"
              key={wallet.adapter.name}
              onClick={() => onSelect(wallet.adapter.name)}
              className={cn(
                "relative flex aspect-square h-auto cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-primary/10 transition hover:border-primary/60 hover:bg-primary/20",
              )}
            >
              {selectedWallet?.adapter.name === wallet.adapter.name && (
                <BorderTrail
                  style={{
                    boxShadow:
                      "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)",
                  }}
                  size={100}
                />
              )}

              <WalletIcon wallet={wallet} size="md" />
              <span className="text-sm text-foreground">
                {wallet.adapter.name}
              </span>
            </Button>
          ))
        ) : (
          <p className="col-span-full text-center text-sm text-muted-foreground">
            No wallet found. Please download a supported Solana wallet.
          </p>
        )}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {wallets.map((wallet) => (
        <Link
          key={wallet.adapter.name}
          href={wallet.adapter.url}
          target="_blank"
          className="flex w-full items-center gap-2 rounded-md border border-primary/10 p-3 transition-all hover:border-primary/60 hover:bg-primary/20"
        >
          <WalletIcon size="md" wallet={wallet} />
          <span className="font-medium text-foreground">
            {wallet.adapter.name}
          </span>
        </Link>
      ))}
    </div>
  );
};
