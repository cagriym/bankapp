"use client";

import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useAuthStore } from "@/hooks/auth";

export default function SignOutButton() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    router.push("/");
    router.refresh();
  };

  return (
    <DropdownMenuItem asChild>
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={handleSignOut}
      >
        Çıkış Yap
      </Button>
    </DropdownMenuItem>
  );
}
