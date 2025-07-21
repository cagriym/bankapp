import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
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
              Email Adresi
            </label>
            <p className="mt-1 text-lg text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Kullanıcı ID
            </label>
            <p className="mt-1 text-gray-700 font-mono text-sm">{user.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Kayıt Tarihi
            </label>
            <p className="mt-1 text-gray-700">
              {new Date(user.created_at).toLocaleDateString("tr-TR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
