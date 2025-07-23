import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../../lib/supabaseClient'; // Bir üst dizindeki lib klasöründen istemciyi import et

// Fastify'da her rota grubu bir plugin olarak tanımlanır. Bu, kodun organize olmasını sağlar.
// Fonksiyon 'async' olduğu için 'done' callback'ine gerek yoktur.
export default async function (server: FastifyInstance, options: FastifyPluginOptions) {
  
  // Giriş endpoint'i: POST /api/auth/login
  // Roadmap'de belirtilen endpoint'i oluşturuyoruz.
  server.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    // Gelen isteğin body'sini alıyoruz. 'as' ile tipini belirtiyoruz ki TypeScript bize yardımcı olsun.
    const { email, password } = request.body as { email?: string; password?: string };


    // Email veya şifre eksikse, 400 Bad Request hatası döndür.
    if (!email || !password) {
      return reply.code(400).send({ error: 'Email ve şifre zorunludur.' });
    }

    try {
      // Supabase'in signInWithPassword fonksiyonu ile kullanıcı girişi yapmayı dene.
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Eğer Supabase bir hata döndürürse (örn: yanlış şifre), 401 Unauthorized hatası döndür.
      if (error) {
        server.log.error(error, 'Supabase giriş hatası');
        return reply.code(401).send({ error: error.message });
      }
      
      // Her şey yolundaysa, 200 OK durumu ile birlikte kullanıcı ve session bilgilerini döndür.
      // Frontend bu bilgiyi (özellikle access_token) alıp sonraki isteklerde kullanacak.
      reply.code(200).send({
        message: 'Giriş başarılı!',
        user: data.user,
        session: data.session,
      });
      const bcrypt = require('bcryptjs');
      const hashedPin = await bcrypt.hash(password, 10);
      // hashedPin’i veritabanına kaydet
      const { data: userData, error: userError } = await supabase.from('users').insert({
        email: email,
        password: hashedPin,
      });
      if (userError) {
        server.log.error(userError, 'Veritabanı kayıt hatası');
      }

    } catch (err) {
      // Beklenmedik bir sunucu hatası olursa, logla ve 500 Internal Server Error döndür.
      server.log.error(err, 'Login endpointinde sunucu hatası');
      reply.code(500).send({ error: 'Sunucuda bir hata oluştu.' });
    }
  });

  // Kayıt endpoint'i: POST /api/auth/register
  server.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, pin } = request.body as { email?: string; pin?: string };

    if (!email || !pin) {
      return reply.code(400).send({ error: 'Email ve PIN zorunludur.' });
    }
    if (!/^[0-9]{4,6}$/.test(pin)) {
      return reply.code(400).send({ error: 'PIN 4-6 haneli rakamlardan oluşmalıdır.' });
    }
    try {
      const bcrypt = require('bcryptjs');
      const hashedPin = await bcrypt.hash(pin, 10);
      const { data, error } = await supabase.from('users').insert({
        email,
        pin_hash: hashedPin,
      });
      if (error) {
        return reply.code(500).send({ error: error.message });
      }
      reply.code(201).send({ message: 'Kayıt başarılı!', user: data });
    } catch (err) {
      server.log.error(err, 'Register endpointinde sunucu hatası');
      reply.code(500).send({ error: 'Sunucuda bir hata oluştu.' });
    }
  });

  // Diğer auth endpoint'lerini (register, logout vb.) buraya ekleyebilirsin.
}