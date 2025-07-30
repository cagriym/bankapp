import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../../lib/supabaseClient'; // Bir üst dizindeki lib klasöründen istemciyi import et
import fastifyJwt from '@fastify/jwt';

// Fastify'da her rota grubu bir plugin olarak tanımlanır. Bu, kodun organize olmasını sağlar.
// Fonksiyon 'async' olduğu için 'done' callback'ine gerek yoktur.
export default async function (server: FastifyInstance, options: FastifyPluginOptions) {
  
  // Giriş endpoint'i: POST /api/auth/login
  // Roadmap'de belirtilen endpoint'i oluşturuyoruz.
  server.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, pin } = request.body as { email?: string; pin?: string };

    if (!email || !pin) {
      return reply.code(400).send({ error: 'Email ve PIN zorunludur.' });
    }

    try {
      // Kullanıcıyı email ile bul
      const { data: user, error } = await supabase
        .from('musteriler')
        .select('pin_hash, musteri_epo, musteri_id, musteri_isim, musteri_soy, musteri_iban, created_at')
        .eq('musteri_epo', email)
        .single();

      if (!user) {
        return reply.code(401).send({ error: 'Kullanıcı bulunamadı.' });
      }

      const bcrypt = require('bcryptjs');
      const isMatch = await bcrypt.compare(pin, user.pin_hash);

      if (!isMatch) {
        return reply.code(401).send({ error: 'PIN hatalı.' });
      }
      const userPayload = {
        musteri_id: user.musteri_id,
        musteri_epo: user.musteri_epo,
        musteri_isim: user.musteri_isim,
        musteri_soy: user.musteri_soy,
        musteri_iban: user.musteri_iban,
        created_at: user.created_at
      };
      const token = server.jwt.sign(userPayload);

      reply.code(200).send({
        message: 'Giriş başarılı!',
        token,
        user: userPayload
      });
    } catch (err) {
      server.log.error(err, 'Login endpointinde sunucu hatası');
      reply.code(500).send({ error: 'Sunucuda bir hata oluştu.' });
    }
  });

  // Kayıt endpoint'i: POST /api/auth/register
  server.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
    const { isim, soy,  tel, email, pin } = request.body as {
      isim?: string; soy?: string; tel?: string; email?: string; pin?: string;
    };

    if (!isim || !soy ||  !tel || !email ||  !pin) {
      return reply.code(400).send({ error: 'Tüm alanlar zorunludur.' });
    }
    if (!/^[0-9]{6}$/.test(pin)) {
      return reply.code(400).send({ error: 'PIN 6 haneli olmalıdır.' });
    }
    try {
      const bcrypt = require('bcryptjs');
      const hashedPin = await bcrypt.hash(pin, 10);

      // 8 haneli, ilk 3 hanesi 0 olamayacak random ve benzersiz musteri_no üret
      let musteri_no;
      let isUnique = false;
      while (!isUnique) {
        musteri_no = generateRandomMusteriNo();
        const { data: existing } = await supabase
          .from('musteriler')
          .select('musteri_no')
          .eq('musteri_no', musteri_no)
          .single();
        if (!existing) isUnique = true;
      }

      // TR55 ile başlayan 22 haneli rastgele IBAN üret
      let musteri_iban;
      let isIbanUnique = false;
      while (!isIbanUnique) {
        musteri_iban = generateRandomIBAN();
        const { data: existingIban } = await supabase
          .from('musteriler')
          .select('musteri_iban')
          .eq('musteri_iban', musteri_iban)
          .single();
        if (!existingIban) isIbanUnique = true;
      }

      const { data, error } = await supabase.from('musteriler').insert({
        musteri_isim: isim,
        musteri_soy: soy,
        musteri_tel: tel,
        musteri_epo: email,
        musteri_no: musteri_no,
        musteri_iban: musteri_iban,
        musteri_bak: 0,
        pin_hash: hashedPin,
      }).select();
      if (error) {
        return reply.code(500).send({ error: error.message });
      }
      reply.code(201).send({ message: 'Kayıt başarılı!', user: data });
    } catch (err) {
      server.log.error(err, 'Register endpointinde sunucu hatası');
      reply.code(500).send({ error: 'Sunucuda bir hata oluştu.' });
    }
  });

  // Yardımcı fonksiyon: 8 haneli, ilk 3 hanesi 0 olamayacak random musteri_no üret
  function generateRandomMusteriNo() {
    const first = Math.floor(Math.random() * 900) + 100; // 100-999
    const rest = Math.floor(Math.random() * 1000000).toString().padStart(5, '0'); // 00000-999999
    return Number(`${first}${rest}`);
  }

  // Yardımcı fonksiyon: TR55 ile başlayan 22 haneli rastgele IBAN üret
  function generateRandomIBAN() {
    const randomNumbers = Math.floor(Math.random() * 100000000000000000000000).toString().padStart(22, '0');
    return `TR55${randomNumbers}`;
  }
  server.post('/logout', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({ message: 'Çıkış başarılı! Token client tarafından silinmeli.' });
  });
  // Diğer auth endpoint'lerini (register, logout vb.) buraya ekleyebilirsin.
  // Dosya burada bitmeli, fazladan veya eksik parantez olmamalı
}