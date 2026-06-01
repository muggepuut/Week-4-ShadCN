import type { StaticImageData } from "next/image"

import { cn } from "@/lib/utils"

type TransactionListIconProps = {
  src: StaticImageData
  alt: string
}

export function TransactionListIcon({ src, alt }: TransactionListIconProps) {
  const maskUrl = `url(${src.src})`

  return (
    <span
      data-slot="transaction-icon-graphic"
      role="img"
      aria-label={alt}
      className={cn("size-6 shrink-0 bg-transaction-icon-foreground")}
      style={{
        maskImage: maskUrl,
        WebkitMaskImage: maskUrl,
      }}
    />
  )
}
