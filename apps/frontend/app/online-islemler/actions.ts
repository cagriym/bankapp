'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { apiFetch } from "@/lib/api";

// Supabase ile ilgili import ve kodlar kaldırıldı. Tüm auth işlemleri Fastify API'ye fetch ile yapılacak.

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/online-islemler?message=E-posta ve şifre gerekli.')
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Giriş Hatası:', errorData.message)
      return redirect(`/online-islemler?message=${errorData.message}`)
    }

    revalidatePath('/', 'layout')
    redirect('/')
  } catch (error) {
    console.error('Giriş Hatası:', error)
    return redirect('/online-islemler?message=Giriş başarısız. Lütfen bilgilerinizi kontrol edin.')
  }
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/online-islemler?message=E-posta ve şifre gerekli.')
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Kayıt Hatası:', errorData.message)
      return redirect(`/online-islemler?message=${errorData.message}`)
    }

    revalidatePath('/', 'layout')
    return redirect('/online-islemler?message=Hesap oluşturuldu. Lütfen e-postanızı kontrol ederek hesabınızı onaylayın.')
  } catch (error) {
    console.error('Kayıt Hatası:', error)
    return redirect('/online-islemler?message=Kayıt başarısız. Bu e-posta zaten kullanımda olabilir.')
  }
} 