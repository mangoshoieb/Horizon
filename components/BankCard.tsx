import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BankCard = ({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) => {
  return (
    <div className="flex flex-col">
      <Link href="/" className="bank-card">
        <div className="bank-card_content">
          <div>
            <h1 className="text-16 font-semibold text-white">
              {userName}
            </h1>
            <p className="font-ibm-plex-serif text-white font-black">
              {formatAmount(account.currentBalance)}
            </p>
          </div>
          <article className="flex flex-col">
            <div className="flex justify-between">
              <h1 className="text-12 font-semibold text-white">{userName}</h1>
              <h2 className="text-12 font-semibold text-white">●●/●●</h2>
            </div>
            <p className="text-14 font-semibold text-white tracikng-[1.1px]">
            ●●●● ●●●● ●●●● <span className="text-16">1234</span>
            </p>
          </article>
        </div>
        <div className="bank-card_icon">
            <Image
            src={'/icons/paypass.svg'}
            width={20}
            height={24}
            alt="pay"
            className="ml-5"
            />
            <Image
            src={'/icons/mastercard.svg'}
            width={45}
            height={32}
            alt="mastercard"
            />
        </div>
        <Image
            src={'/icons/lines.svg'}
            width={319}
            height={190}
            alt="lines"
            className="absolute left-0 top-0"
            />
      </Link>
    </div>
  );
};

export default BankCard;
