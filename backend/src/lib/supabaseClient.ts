import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// .env dosyasındaki değişkenleri tekrar yükle (her dosya kendi başına çalışır)
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Backend'de her zaman 'service_role' anahtarını kullanmak en iyisidir.
// Bu anahtar, RLS (Row Level Security) kurallarını atlayarak tam erişim sağlar.
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; 

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL veya Service Key bulunamadı. .env dosyasını kontrol et.");
}

// Supabase istemcisini oluştur ve dışa aktar
export const supabase = createClient(supabaseUrl, supabaseKey);