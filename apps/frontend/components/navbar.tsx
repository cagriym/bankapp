"use client";
import { siteConfig } from "@/config/site";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { useAutoLogin } from "@/hooks/auth";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useAuthStore } from "@/hooks/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignOutButton from "@/components/SignOutButton";
import { useState, useEffect } from "react";
import { formatUserName } from "@/lib/utils";

function useAuthHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}

export function Navbar() {
  const hydrated = useAuthHydrated();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  if (!hydrated) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Left: Logo (min width) */}
        <div className="flex items-center min-w-[200px]">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
        </div>

        {/* Center: Navigation ortalanmış */}
        <div className="flex-1 flex justify-start">
          <nav className="flex items-center gap-6">
            {user && (
              <Link
                href="/bireysel"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Bireysel
              </Link>
            )}
            <Link
              href="/ticari"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Ticari
            </Link>
            <Link
              href="/yatirim"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Yatırım
            </Link>
          </nav>
        </div>

        {/* Right: Online İşlemler (daha sağda) */}
        <div className="flex items-center justify-end gap-4 min-w-[200px]">
          {!isAuthenticated && (
            <Button asChild>
              <Link href="/login">Online İşlemler</Link>
            </Button>
          )}
          {isAuthenticated && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user.musteri_epo}
                      alt={user.email || ""}
                    />
                    <AvatarFallback>
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {formatUserName(user.musteri_isim, user.musteri_soy) ||
                        user.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profil">Profil</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <SignOutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
