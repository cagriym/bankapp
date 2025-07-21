create table public.musteriler (
  musteri_id bigserial primary key,
  created_at timestamp with time zone default now(),
  musteri_isim varchar(64) not null,
  musteri_soy varchar(64) not null,
  musteri_no bigint unique not null,
  musteri_tel varchar(20),
  musteri_epo varchar(128) unique not null,
  musteri_bak numeric(15,2) default 0,         -- Vadesiz bakiye
  pin_hash varchar(128) not null
);

-- İşlemler tablosu
create table public.islemler (
  islem_id bigserial primary key,
  musteri_id bigint references public.musteriler(musteri_id),
  islem_tipi varchar(32) not null,             -- 'cekme', 'yatirma', 'faize_yatir', 'faizden_cek'
  tutar numeric(15,2) not null,
  aciklama text,
  created_at timestamp with time zone default now()
);

-- Vadeli (faizli) hesap tablosu
create table public.faiz_hesaplari (
  faiz_id bigserial primary key,
  musteri_id bigint references public.musteriler(musteri_id),
  ana_para numeric(15,2) not null,
  faiz_orani numeric(5,2) not null,            -- Yüzde olarak (örn: 15.50)
  baslangic_tarihi timestamp with time zone default now(),
  bitis_tarihi timestamp with time zone,
  aktif boolean default true
);