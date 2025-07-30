"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/auth";
import jwtDecode from "jwt-decode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatUserName, formatIBAN } from "@/lib/utils";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null; // veya bir loader gösterebilirsin
  }

  return (
    <div className="pt-32">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Profilim
        </h1>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">
              Ad Soyad:
            </label>
            <p className="mt-1 text-lg text-gray-900">
              {formatUserName(user.musteri_isim, user.musteri_soy)}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">IBAN:</label>
            <p className="mt-1 text-lg text-gray-900 font-mono">
              {formatIBAN(user.musteri_iban)}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Email Adresi : {user.musteri_epo}
            </label>
            <p className="mt-1 text-lg text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Kullanıcı ID : {user.musteri_id}
            </label>
            <p className="mt-1 text-gray-700 font-mono text-sm">{user.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Kayıt Tarihi :{" "}
              {user.created &&
                new Date(user.created).toLocaleDateString("tr-TR")}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
