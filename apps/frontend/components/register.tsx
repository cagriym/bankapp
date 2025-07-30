"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";

export default function Register() {
  const [isim, setIsim] = useState("");
  const [soy, setSoy] = useState("");
  const [no, setNo] = useState("");
  const [tel, setTel] = useState("");
  const [bakiye, setBakiye] = useState("");
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isim,
          soy,
          no: Number(no),
          tel,
          email,
          bakiye: Number(bakiye),
          pin,
        }),
      });
      const data = await res.json();
      if (data.message) {
        setSuccess(true);
        setTimeout(() => {
          router.push(
            "/login?message=Kaydınız oluşturuldu. Lütfen giriş yapın."
          );
        }, 2000);
      } else {
        setError(data.error || "Kayıt başarısız.");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>Kayıt Ol</CardTitle>
          <CardDescription>
            Yeni bir hesap oluşturarak Munja Bank ailesine katılın.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="isim">Ad</Label>
            <Input
              id="isim"
              type="text"
              value={isim}
              onChange={(e) => setIsim(e.target.value)}
              required
              placeholder="Adınız"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="soy">Soyad</Label>
            <Input
              id="soy"
              type="text"
              value={soy}
              onChange={(e) => setSoy(e.target.value)}
              required
              placeholder="Soyadınız"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tel">Telefon</Label>
            <Input
              id="tel"
              type="text"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              required
              placeholder="Telefon Numaranız"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ornek@eposta.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="pin">PIN</Label>
            <Input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
              placeholder="örn: 123456"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm">
              Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full">
            Hesap Oluştur
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => router.push("/login")}
          >
            Zaten hesabım var
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
