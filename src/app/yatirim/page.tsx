import React from "react";

export default function YatirimPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Yatırım Hizmetleri</h1>
      <p className="mb-4">
        Munja Bank olarak, bireysel ve kurumsal müşterilerimize geniş bir
        yatırım ürün yelpazesi sunuyoruz. Portföyünüze en uygun yatırım
        araçlarını seçerek birikimlerinizi değerlendirmenize yardımcı oluyoruz.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Hisse Senedi</h2>
          <p>
            Borsa İstanbul&#39;da işlem gören hisse senetlerine yatırım yaparak
            şirketlerin büyümesine ortak olun.
          </p>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Yatırım Fonları</h2>
          <p>
            Alanında uzman portföy yöneticileri tarafından yönetilen yatırım
            fonları ile riskinizi dağıtın.
          </p>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Döviz İşlemleri</h2>
          <p>
            Anlık kur bilgileri ile döviz alım-satım işlemlerinizi hızlı ve
            güvenli bir şekilde gerçekleştirin.
          </p>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            Altın ve Değerli Madenler
          </h2>
          <p>
            Altın ve diğer değerli madenlere yatırım yaparak portföyünüzü
            çeşitlendirin.
          </p>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Tahvil ve Bono</h2>
          <p>
            Devlet tahvilleri ve özel sektör bonoları ile sabit getirili menkul
            kıymetlere yatırım yapın.
          </p>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Eurobond</h2>
          <p>
            Döviz cinsinden ihraç edilen Eurobond&#39;lar ile uluslararası
            piyasalarda yatırım yapma fırsatı yakalayın.
          </p>
        </div>
      </div>
    </div>
  );
}
