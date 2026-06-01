import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TransactionListIcon } from "@/components/transaction-list-icon"
import audFlag from "@assets/flags/aud.png"
import arrowUpIcon from "@assets/icons/arrow-up.png"
import plusIcon from "@assets/icons/plus.png"
import cadFlag from "@assets/flags/cad.png"
import eurFlag from "@assets/flags/eur.png"
import gbpFlag from "@assets/flags/gbp.png"

/**
 * DESIGNER NOTE: Wise-style dashboard — layout and structure only.
 * All core sections use ShadCN components. Designers can restyle to match Wise UI (colours, typography, spacing).
 *
 * Sections:
 * — Total balance + action buttons (Send, Add money, Request)
 * — Currency account cards (EUR, AUD, CAD, GBP)
 * — Recent transactions list
 * — Footer (Provided by Wise Assets Europe)
 */

const CURRENCY_ACCOUNTS: {
  code: string
  label: string
  accountId: string
  balance: string
  flag: StaticImageData
}[] = [
  { code: "EUR", label: "EUR", accountId: "51568", balance: "1.00", flag: eurFlag },
  { code: "AUD", label: "AUD", accountId: "30779", balance: "0.00", flag: audFlag },
  { code: "CAD", label: "CAD", accountId: "15376", balance: "0.00", flag: cadFlag },
  { code: "GBP", label: "GBP", accountId: "13159", balance: "0.00", flag: gbpFlag },
]

const RECENT_TRANSACTIONS = [
  {
    id: "1",
    icon: arrowUpIcon,
    iconAlt: "Sent",
    name: "Hannah Johnson",
    subtitle: "Sent - 18 Apr",
    amount: "49 EUR",
    isCredit: false,
  },
  {
    id: "2",
    icon: plusIcon,
    iconAlt: "Added",
    name: "To EUR",
    subtitle: "Added - 18 Apr",
    amount: "+ 50 EUR",
    subAmount: "50.44 EUR",
    isCredit: true,
  },
  {
    id: "3",
    icon: arrowUpIcon,
    iconAlt: "Sent",
    name: "Brandon Bolt",
    subtitle: "Sent - 2 Apr",
    amount: "110 EUR",
    isCredit: false,
  },
]

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-[976px] flex-1 flex-col p-6">
      {/* Total balance + actions */}
      <section className="mb-6 space-y-5">
        <div className="space-y-0">
          <p className="text-sm font-medium text-balance-foreground">Total balance</p>
          <h2 className="text-3xl font-bold tracking-tight">1.00 EUR</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm">Send</Button>
          <Button size="sm" variant="secondary">
            Add money
          </Button>
          <Button size="sm" variant="secondary">
            Request
          </Button>
        </div>
      </section>

      {/* Currency account cards */}
      <section className="mb-14 overflow-x-auto">
        <div className="flex w-max gap-[12px]">
        {CURRENCY_ACCOUNTS.map((account) => (
          <Card key={account.code} className="h-[206px] w-[256px] shrink-0 justify-between gap-0 py-4">
            <CardHeader className="flex flex-row items-center justify-start space-y-0 pb-0">
              <Image
                src={account.flag}
                alt={`${account.label} flag`}
                width={48}
                height={48}
                className="size-12 shrink-0"
              />
              <CardTitle className="text-base font-medium">{account.label}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-end space-y-1 pt-0">
              <p className="text-xs text-muted-foreground">Account - {account.accountId}</p>
              <p className="text-2xl font-bold">{account.balance}</p>
            </CardContent>
          </Card>
        ))}
        </div>
      </section>

      {/* Recent transactions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Transactions</h2>
          <Button variant="ghost" size="sm" className="h-auto px-0" asChild>
            <Link href="/">See all</Link>
          </Button>
        </div>
        <ul className="divide-y divide-border">
          {RECENT_TRANSACTIONS.map((tx) => (
            <li key={tx.id} className="flex items-center gap-4 py-3">
              <div
                data-slot="transaction-icon"
                className="flex size-12 shrink-0 items-center justify-center rounded-full border border-transaction-icon-border bg-transaction-icon"
              >
                <TransactionListIcon src={tx.icon} alt={tx.iconAlt} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{tx.name}</p>
                <p className="text-sm text-muted-foreground">{tx.subtitle}</p>
                {tx.subAmount && (
                  <p className="text-xs text-muted-foreground">{tx.subAmount}</p>
                )}
              </div>
              <p className={`shrink-0 text-right font-medium ${tx.isCredit ? "text-primary" : ""}`}>
                {tx.amount}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-auto pt-4">
        <p className="text-xs text-muted-foreground">
          Provided by Wise Assets Europe
        </p>
      </footer>
    </div>
  )
}
