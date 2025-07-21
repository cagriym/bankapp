const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");

const supabaseUrl = process.env.SUPABASE_URL || "http://127.0.0.1:54321";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async function (fastify, opts) {
  fastify.post("/register", async (request, reply) => {
    const {
      musteri_isim,
      musteri_soy,
      musteri_no,
      musteri_tel,
      musteri_epo,
      pin,
    } = request.body;
    if (!musteri_isim || !musteri_soy || !musteri_no || !musteri_epo || !pin) {
      return reply.status(400).send({ error: "Eksik bilgi var!" });
    }
    const pin_hash = await bcrypt.hash(pin, 10);

    const { data, error } = await supabase
      .from("musteriler")
      .insert([
        {
          musteri_isim,
          musteri_soy,
          musteri_no,
          musteri_tel,
          musteri_epo,
          musteri_bak: 0,
          pin_hash,
        },
      ])
      .select()
      .single();

    if (error) {
      return reply.status(400).send({ error: error.message });
    }
    return reply.send({ musteri: data });
  });
};
