import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Türkçe karakter encoding sorununu çözer
 * @param text - Encoding sorunu olan metin
 * @returns Düzeltilmiş metin
 */
export function fixTurkishEncoding(text: string): string {
  if (!text) return text;
  
  // Decode URI component ile encoding sorununu çöz
  try {
    return decodeURIComponent(escape(text));
  } catch {
    // Eğer decode başarısız olursa orijinal metni döndür
    return text;
  }
}

/**
 * Kullanıcı adını güvenli şekilde gösterir
 * @param firstName - Ad
 * @param lastName - Soyad
 * @returns Düzeltilmiş ad soyad
 */
export function formatUserName(firstName?: string, lastName?: string): string {
  const fixedFirstName = firstName ? fixTurkishEncoding(firstName) : '';
  const fixedLastName = lastName ? fixTurkishEncoding(lastName) : '';
  
  return `${fixedFirstName} ${fixedLastName}`.trim();
}

/**
 * IBAN'ı formatlar (TR55 1234 5678 9101 2345 5642 56)
 * @param iban - Ham IBAN
 * @returns Formatlanmış IBAN
 */
export function formatIBAN(iban: string): string {
  if (!iban) return '';
  
  // TR55'ten sonraki kısmı al
  const numbers = iban.replace('TR55', '');
  
  // 4'lü gruplar halinde böl
  const groups = [];
  for (let i = 0; i < numbers.length; i += 4) {
    groups.push(numbers.slice(i, i + 4));
  }
  
  return `TR55 ${groups.join(' ')}`;
}

/**
 * IBAN'ın geçerli olup olmadığını kontrol eder
 * @param iban - Kontrol edilecek IBAN
 * @returns Geçerli mi?
 */
export function isValidIBAN(iban: string): boolean {
  if (!iban) return false;
  
  // TR55 ile başlamalı
  if (!iban.startsWith('TR55')) return false;
  
  // Toplam 26 karakter olmalı (TR55 + 22 rakam)
  if (iban.length !== 26) return false;
  
  // TR55'ten sonraki kısım sadece rakam olmalı
  const numbers = iban.replace('TR55', '');
  return /^\d{22}$/.test(numbers);
}
