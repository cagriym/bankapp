"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BireyselSidebar } from "@/components/bireysel-sidebar";
import { formatIBAN, isValidIBAN } from "@/lib/utils";

type Hesap = {
  id: string;
  tip: "Vadesiz" | "Vadeli";
  bakiye: number;
  iban: string;
  acilisTarihi: string;
  faizOrani?: number;
  vadeTarihi?: string;
};

export default function HesaplarimPage() {
  const [hesaplar] = useState<Hesap[]>([
    {
      id: "1",
      tip: "Vadesiz",
      bakiye: 12500.5,
      iban: "TR12 0001 0000 1234 5678 9101 12",
      acilisTarihi: "15.01.2023",
    },
    {
      id: "2",
      tip: "Vadeli",
      bakiye: 50000.0,
      iban: "TR34 0002 0000 9876 5432 1098 76",
      acilisTarihi: "20.03.2023",
      faizOrani: 15.5,
      vadeTarihi: "20.03.2024",
    },
  ]);

  const [iban, setIban] = useState("");
  const [adSoyad, setAdSoyad] = useState("");
  const [tutar, setTutar] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [success, setSuccess] = useState(false);
  const [ibanError, setIbanError] = useState("");
  const [history, setHistory] = useState([
    {
      tarih: "22/07/2024",
      alici: "Ahmet Yılmaz",
      iban: "TR12 0001 0000 1234 5678 9101 12",
      tutar: 500,
      aciklama: "Kira",
    },
    {
      tarih: "20/07/2024",
      alici: "Mehmet Demir",
      iban: "TR34 0002 0000 9876 5432 1098 76",
      tutar: 250,
      aciklama: "Hediye",
    },
  ]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // IBAN validation
    if (!isValidIBAN(iban)) {
      setIbanError("Geçerli bir IBAN giriniz (TR55 ile başlamalı)");
      return;
    }
    setIbanError("");

    setHistory([
      {
        tarih: new Date().toLocaleDateString("tr-TR"),
        alici: adSoyad,
        iban,
        tutar: Number(tutar),
        aciklama,
      },
      ...history,
    ]);
    setSuccess(true);
    setIban("");
    setAdSoyad("");
    setTutar("");
    setAciklama("");
    setTimeout(() => setSuccess(false), 2000);
  }

  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <BireyselSidebar />
      <div className="flex flex-col items-center justify-center p-8">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 w-full max-w-4xl mb-8">
          <h1 className="font-semibold text-xl">Hesaplarım</h1>
        </header>
        <main className="w-full max-w-4xl">
          {/* Hesaplar Bölümü */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Hesap Bilgileri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hesaplar.map((hesap) => (
                    <div
                      key={hesap.id}
                      className="border rounded-lg p-4 flex flex-col gap-2 bg-gray-50"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">
                          {hesap.tip} Hesap
                        </span>
                        <span className="text-gray-500 text-sm">
                          {hesap.acilisTarihi}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {hesap.bakiye.toLocaleString("tr-TR")} ₺
                      </div>
                      <div className="text-xs text-gray-600">
                        IBAN: {hesap.iban}
                      </div>
                      {hesap.faizOrani && (
                        <div className="text-sm text-blue-600">
                          Faiz Oranı: %{hesap.faizOrani}
                        </div>
                      )}
                      {hesap.vadeTarihi && (
                        <div className="text-sm text-orange-600">
                          Vade Tarihi: {hesap.vadeTarihi}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Para Transfer Formu */}
          <Card>
            <CardHeader>
              <CardTitle>Para Transferi</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  placeholder="Alıcı IBAN (TR55 ile başlamalı)"
                  value={iban}
                  onChange={(e) => {
                    setIban(e.target.value);
                    if (ibanError) setIbanError("");
                  }}
                  required
                  maxLength={26}
                  className={ibanError ? "border-red-500" : ""}
                />
                {ibanError && (
                  <div className="text-red-500 text-sm">{ibanError}</div>
                )}
                <Input
                  type="text"
                  placeholder="Alıcı Ad Soyad"
                  value={adSoyad}
                  onChange={(e) => setAdSoyad(e.target.value)}
                  required
                />
                <Input
                  type="number"
                  placeholder="Tutar (₺)"
                  value={tutar}
                  onChange={(e) => setTutar(e.target.value)}
                  required
                  min={1}
                />
                <Input
                  type="text"
                  placeholder="Açıklama (opsiyonel)"
                  value={aciklama}
                  onChange={(e) => setAciklama(e.target.value)}
                />
                <Button type="submit">Gönder</Button>
                {success && (
                  <div className="text-green-600 font-semibold">
                    Transfer başarılı!
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* İşlem Geçmişi */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Son İşlemler</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2">Tarih</th>
                      <th>Alıcı</th>
                      <th>IBAN</th>
                      <th>Tutar</th>
                      <th>Açıklama</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-2">{item.tarih}</td>
                        <td>{item.alici}</td>
                        <td className="font-mono text-xs">{item.iban}</td>
                        <td>{item.tutar} ₺</td>
                        <td>{item.aciklama}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
