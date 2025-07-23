import fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';

// Auth route'unu import et
import authRoutes from './routes/auth/index';

// .env dosyasındaki değişkenleri yükle
dotenv.config();

const server = fastify({
  // Gelen istekleri ve diğer önemli bilgileri konsolda görmek için loglamayı açar.
  // Geliştirme sırasında çok faydalıdır.
  logger: true 
});

// Frontend'den gelen isteklere izin vermek için CORS'u etkinleştir
server.register(cors, {
  // Geliştirme aşamasında olduğumuz için şimdilik tüm kaynaklardan gelen isteklere
  // izin veriyoruz. Ürünü canlıya alırken bunu frontend'in adresiyle
  // (örneğin 'http://localhost:3000') kısıtlamak daha güvenlidir.
  origin: '*', 
});

// Test için bir route (endpoint) oluşturalım
server.get('/', async (request, reply) => {
  // Bu endpoint'e bir GET isteği geldiğinde basit bir JSON nesnesi döndürür.
  return { message: 'Fastify backend çalışıyor!' };
});

// Auth rotalarını '/api/auth' ön ekiyle kaydet.
// Artık auth/index.ts içindeki '/login' endpoint'i '/api/auth/login' olarak erişilebilir olacak.
server.register(authRoutes, { prefix: '/api/auth' });


// Sunucuyu belirtilen portta dinlemeye başla
const start = async () => {
  try {
    // .env dosyasında bir BACKEND_PORT tanımlı mı diye bakar, yoksa 5001'i kullanır.
    const port = process.env.BACKEND_PORT || 5001;
    await server.listen({ port: +port, host: '0.0.0.0' });
    
    // Sunucu başarıyla başladığında konsola bilgi mesajı yazdırılmaz.
    // `logger: true` ayarı sayesinde Fastify bunu otomatik olarak yapar.
  } catch (err) {
    // Bir hata olursa, hatayı konsola yazdır ve uygulamayı kapat.
    server.log.error(err);
    process.exit(1);
  }
};

start(); 