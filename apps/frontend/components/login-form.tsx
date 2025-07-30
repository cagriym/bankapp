"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/hooks/auth";
import { apiFetch } from "@/lib/api";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Use relative path to avoid hardcoding backend URL
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pin: password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        useAuthStore.getState().setUser(data.user, data.token);
        router.push("/profil");
        router.refresh();
      } else {
        setError(data.error || data.message || "Giriş başarısız.");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full max-w-sm">
      <Card className="shadow-xl border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-[#023E8A] font-bold">
            Hesabınıza Giriş Yapın
          </CardTitle>
          <CardDescription className="text-[#495057]">
            Banka işlemleriniz için bilgilerinizi giriniz
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Giriş Yap
          </Button>
        </CardFooter>
        <CardFooter>
          <Button type="button" className="w-full" variant="outline" asChild>
            <a href="/register">Kayıt Ol</a>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
