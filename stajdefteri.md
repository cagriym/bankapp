# Staj Defteri - 30 Günlük Plan

## Teknoloji Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Data Fetching**: TanStack Query (React Query)

### Backend

- **Runtime**: Node.js
- **Framework**: Fastipy API
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Database Service**: Supabase
- **Authentication**: Supabase Auth + JWT

### Database

- **Primary Database**: PostgreSQL (via Supabase)
- **Real-time Features**: Supabase Realtime
- **File Storage**: Supabase Storage

## Geliştirme Planı (30 Gün)

#### Gün 1-4: Proje Kurulumu ve Database

**Hedef**: Proje altyapısını hazırlamak

- [x] Next.js + TypeScript kurulumu
- [x] shadcn/ui kurulumu ve temel bileşenler
- [x] Fastify backend kurulumu
- [x] Supabase hesabı ve database kurulumu
- [x] Temel tablo yapıları (users, accounts, transactions, atm_machines, banknote_inventory)
- [x] Environment variables ayarları

#### Gün 5-8: Authentication ve User Management

**Hedef**: Kullanıcı giriş/çıkış sistemi

- [x] Supabase Auth entegrasyonu
- [ ] PIN şifreleme sistemi
- [x] Login/Register sayfaları
- [ ] Zustand auth store
- [x] Protected routes
- [ ] Hesap kilitleme (basit versiyon)

#### Gün 9-12: ATM Para Çekme Sistemi

**Hedef**: Temel para çekme özelliği

- [ ] Banknot hesaplama algoritması (greedy approach)
- [ ] Para çekme API'leri
- [ ] ATM ana ekranı
- [ ] Para çekme interface'i
- [ ] Bakiye kontrolü
- [ ] Basit limit kontrolü

#### Gün 13-14: Banknot Yönetimi

**Hedef**: Banknot stok sistemi

- [ ] Banknot stok takibi
- [ ] Stok güncelleme
- [ ] Basit admin panel
- [ ] ATM durumu gösterimi

#### Gün 15-18: Para Yatırma ve İşlem Geçmişi

**Hedef**: Para yatırma sistemi

- [ ] Para yatırma API'leri
- [ ] Para yatırma interface'i
- [ ] İşlem geçmişi sayfası
- [ ] İşlem detay sayfaları
- [ ] Basit fiş sistemi

#### Gün 19-22: Kredi Sistemi

**Hedef**: Basit kredi özelliği

- [ ] Otomatik kredi teklifi
- [ ] Faiz hesaplama (basit)
- [ ] Kredi onay sistemi
- [ ] Kredi detay sayfası
- [ ] Geri ödeme interface'i

#### Gün 23-26: Nakit Yönetimi ve Admin

**Hedef**: Nakit yönetimi sistemi

- [ ] ATM bakiye takibi
- [ ] Otomatik para transferi (basit)
- [ ] Admin dashboard
- [ ] Stok yönetimi ekranları
- [ ] Temel raporlar

#### Gün 27-30: Testing ve Final

**Hedef**: Test ve tamamlama

- [ ] Temel unit testler
- [ ] E2E testler (kritik akışlar)
- [ ] Bug fixing
- [ ] Performance optimizasyonu
- [ ] Documentation

## Minimum Viable Product (MVP) Özellikleri

### Core Features

- [ ] Kullanıcı giriş/çıkış (PIN ile)
- [ ] Para çekme (banknot dağılımı ile)
- [ ] Bakiye sorgulama
- [ ] Basit limit kontrolü
- [ ] İşlem geçmişi

### Advanced Features

- [ ] Para yatırma
- [ ] Otomatik kredi sistemi
- [ ] Faiz hesaplama
- [ ] ATM banknot yönetimi
- [ ] Admin paneli

### Security Features

- [ ] PIN şifreleme
- [ ] Basit hesap kilitleme
- [ ] İşlem logları
- [ ] Temel rate limiting

## Basitleştirilmiş Yaklaşım

### Database Schema (Minimum)

```
- users (id, email, pin_hash, balance, daily_limit, failed_attempts)
- atm_machines (id, code, location, total_cash, is_active)
- banknote_inventory (id, atm_id, denomination, quantity)
- transactions (id, user_id, atm_id, type, amount, status, banknote_distribution)
- loans (id, user_id, amount, interest_rate, due_date, status)
```

### API Endpoints (Minimum)

```
Auth:
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/verify-pin

ATM:
- POST /api/atm/withdraw
- POST /api/atm/deposit
- GET /api/atm/balance
- GET /api/atm/status

Transactions:
- GET /api/transactions
- GET /api/transactions/:id

Loans:
- GET /api/loans
- POST /api/loans/apply
- POST /api/loans/repay

Admin:
- GET /api/admin/atm-status
- POST /api/admin/cash-transfer
```

### Frontend Pages (Minimum)

```
- /login - Giriş sayfası
- /atm - ATM ana ekranı
- /atm/withdraw - Para çekme
- /atm/deposit - Para yatırma
- /account - Hesap özeti
- /transactions - İşlem geçmişi
- /loans - Kredi yönetimi
- /admin - Admin paneli
```

## Günlük Çalışma Planı

### Haftanın Her Günü

- **Sabah (4 saat)**: Backend geliştirme
- **Öğleden sonra (4 saat)**: Frontend geliştirme
- **Akşam (2 saat)**: Test ve entegrasyon

### Öncelik Sırası

1. **Yüksek**: Authentication, Para çekme, Bakiye sorgulama
2. **Orta**: Para yatırma, İşlem geçmişi, Basit admin
3. **Düşük**: Kredi sistemi, Gelişmiş raporlar, Optimizasyon

## Risk Azaltma Stratejileri

### Zaman Tasarrufu İçin

- [ ] Hazır UI bileşenlerini kullan (shadcn/ui)
- [ ] Supabase Auth kullan (custom auth yerine)
- [ ] Basit algoritma kullan (kompleks optimizasyon yerine)
- [ ] Mock data kullan (gerçek integrasyon yerine)
- [ ] Minimal styling (fancy animasyon yerine)

### Scope Azaltma

- [ ] Sadece 1 ATM desteği
- [ ] Temel banknot türleri (200, 100, 50, 20, 10, 5)
- [ ] Basit faiz hesaplama
- [ ] Minimal admin özellikler
- [ ] Basit raporlama

## Başarı Kriterleri

### Teknik

- [ ] Çalışan authentication sistemi
- [ ] Fonksiyonel para çekme/yatırma
- [ ] Banknot dağılımı çalışıyor
- [ ] Temel admin paneli aktif
- [ ] Responsive design

### Fonksiyonel

- [ ] Kullanıcı para çekebiliyor
- [ ] Bakiye güncellemesi çalışıyor
- [ ] İşlem geçmişi görüntüleniyor
- [ ] Basit kredi sistemi aktif
- [ ] ATM stok yönetimi çalışıyor

## Geliştirme Araçları

### Must-Have

- VS Code + Extensions (TypeScript, Tailwind, Prettier)
- Postman (API testing)
- Supabase Dashboard
- GitHub

### Nice-to-Have

- Vercel Preview (deployment)
- Figma (UI design)
- Linear/Notion (task tracking)
