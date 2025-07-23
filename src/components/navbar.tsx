import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/config/site";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import Link from "next/link";
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

export async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
        <div className="flex-1 flex justify-center">
          <nav className="flex items-center gap-6">
            <Link
              href="/bireysel"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Bireysel
            </Link>
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
            <Link
              href="/yatirimci-iliskileri"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Yatırımcı İlişkileri
            </Link>
          </nav>
        </div>

        {/* Right: Online İşlemler (daha sağda) */}
        <div className="flex items-center justify-end gap-4 min-w-[200px]">
          {!user && (
            <Button asChild>
              <Link href="/login">Online İşlemler</Link>
            </Button>
          )}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user.user_metadata.avatar_url}
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
                      {user.user_metadata.full_name || user.email}
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
