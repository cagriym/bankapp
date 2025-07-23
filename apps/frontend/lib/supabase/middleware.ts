import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Bu, middleware'in yanıtı değiştirmesine olanak tanıyan bir kopya oluşturur.
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Supabase istemcisini oluştur ve cookieleri ayarla
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Eğer `set` çağrılırsa, cookieler response'a eklenir.
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          // Eğer `remove` çağrılırsa, cookieler response'dan silinir.
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Oturumu yenilemek önemlidir, özellikle sunucu bileşenlerinde `supabase.auth.getUser()` kullanılıyorsa.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const protectedPaths = ['/bireysel', '/ticari', '/yatirimci', '/profil']
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (!user && isProtectedPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return response
}