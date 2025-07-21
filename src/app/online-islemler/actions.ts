'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/online-islemler?message=E-posta ve şifre gerekli.')
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Giriş Hatası:', error.message)
    return redirect('/online-islemler?message=Giriş başarısız. Lütfen bilgilerinizi kontrol edin.')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/online-islemler?message=E-posta ve şifre gerekli.')
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    console.error('Kayıt Hatası:', error.message)
    return redirect('/online-islemler?message=Kayıt başarısız. Bu e-posta zaten kullanımda olabilir.')
  }

  revalidatePath('/', 'layout')
  return redirect('/online-islemler?message=Hesap oluşturuldu. Lütfen e-postanızı kontrol ederek hesabınızı onaylayın.')
} 