"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6 text-sm">
      <Link
        href="/bireysel"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/bireysel")
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        Bireysel
      </Link>
      <Link
        href="/ticari"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/ticari")
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        Ticari
      </Link>
      <Link
        href="/yatirimci"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/yatirimci")
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        Yatırımcı İlişkileri
      </Link>
      <Link
        href="/yatirim"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/yatirim")
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        Yatırım
      </Link>
    </nav>
  );
}
