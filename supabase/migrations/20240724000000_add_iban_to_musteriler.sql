-- Müşteriler tablosuna IBAN alanı ekle
ALTER TABLE public.musteriler 
ADD COLUMN musteri_iban VARCHAR(29) UNIQUE;

-- Mevcut müşterilere IBAN ata
UPDATE public.musteriler 
SET musteri_iban = CONCAT('TR55', LPAD(FLOOR(RANDOM() * 100000000000000000000000)::TEXT, 22, '0'))
WHERE musteri_iban IS NULL;

-- IBAN alanını NOT NULL yap
ALTER TABLE public.musteriler 
ALTER COLUMN musteri_iban SET NOT NULL;

-- IBAN için index oluştur
CREATE INDEX idx_musteriler_iban ON public.musteriler(musteri_iban); 