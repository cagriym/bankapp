"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/L9rfmDRcchk
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
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

export default function ParaAktarPage() {
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
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 w-full max-w-2xl mb-8">
          <h1 className="font-semibold text-xl">Para Gönder</h1>
        </header>
        <main className="w-full max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Banka Para Transferi</CardTitle>
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
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Son Para Transferleri</CardTitle>
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

function BanknoteIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CircleArrowUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m16 12-4-4-4 4" />
      <path d="M12 16V8" />
    </svg>
  );
}

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function FileTextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
