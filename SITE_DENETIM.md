# BARTSS Site Denetimi

## Kritik (yayın öncesi)
- [ ] Ana sayfada (bartss-hero-preview.html) meta description, canonical, Open Graph, Twitter kartı yok
- [ ] Hiçbir sayfada canonical ve Open Graph yok (37 sayfanın hepsi)
- [ ] robots.txt, sitemap.xml, 404.html, favicon, manifest yok
- [ ] Ana sayfa adı `bartss-hero-preview.html`; yayında `index.html` olmalı. Mevcut index.html eski sürüm, 2 adet H1 var
- [ ] İletişim bölümünde form, WhatsApp, telefon, e-posta bağlantısı yok. Ziyaretçinin ulaşacağı kanal yok
- [ ] KVKK / gizlilik / çerez metni yok
- [ ] Analytics ve Search Console yok
- [ ] Ana sayfada 24 görselin 14'ünde alt metin yok; blog sayfalarında görsel alt metni yok
- [ ] Yayın klasöründe deney dosyaları var: narrative-scroll-v2 (2,8 MB), scroll-story (2,2 MB), spin-crew (1,1 MB), crown-kin, scroll-story-v1, monitor-reveal-lab, loader-preview, direction-piktram, case, system. Yayına alınmamalı
- [ ] soli.html ve motion/ sayfalarında description yok

## SEO / GEO
- [ ] Sayfa başına benzersiz title/description (hizmet ve proje sayfalarında var, ana sayfada yok)
- [ ] Organization, Service, BreadcrumbList, FAQPage şeması
- [ ] llms.txt
- [ ] TR/EN için hreflang ya da ayrı URL. Şu an dil metni tarayıcıda değiştiriliyor, arama motoru İngilizceyi görmez
- [ ] Sosyal paylaşım görseli 1200x630

## Performans
- [ ] Ana sayfa tek dosyada 114 KB satır içi CSS/JS
- [ ] Çoğu PNG; WebP/AVIF'e çevrilmeli, boyut sınırı konmalı
- [ ] Bazı hizmet görselleri at.adobe.com adresinden geliyor. Dış kaynak düşerse görsel kaybolur; yerel kopya gerekli
- [ ] Ana sayfa yükleme ekranı en az 1,9 sn bekliyor; tekrar ziyarette atlanmalı

## Tasarım / UX
- [ ] Detay sayfalarında ortak header/footer var; ana sayfa ayrı. İki yapı tek bileşene indirilmeli
- [ ] Mobil menü, odak halkaları ve klavye gezinmesi test edilmeli
- [ ] prefers-reduced-motion ana animasyonlarda var, kaydırıcı ve ticker için kontrol edilmeli

## Dönüşüm kurgusu
1. Her sayfada tek ana CTA: "Projenizi anlatın". Header'da sabit, sayfa sonunda tekrar.
2. Kısa brief formu (ad, e-posta/telefon, ihtiyaç türü, bütçe aralığı, kısa not). Gönderince WhatsApp ve e-postaya düşer. Hedef sitesindeki 4 adımlı akış örnek alınabilir.
3. Hızlı kanallar: sabit WhatsApp butonu, telefon, 15 dk tanışma görüşmesi için takvim bağlantısı.
4. Proje sayfaları: sonuç, kapsam ve süre net; sonunda "Benzer bir iş mi istiyorsunuz?" bloğu ve ilgili hizmete bağlantı.
5. Hizmet sayfaları: kimler için, ne teslim edilir, süre, fiyat aralığı ("başlangıç fiyatı" ya da paket), SSS.
6. Güven: gerçek müşteri adları, kısa alıntılar, süreç adımları, teslim edilen dosya listesi.
7. Fiyat sayfası ya da "nasıl fiyatlıyoruz" bölümü; bilgi eksikliği en sık kaybettiren noktadır.
8. Konsept çalışmalar "konsept" olarak etiketli kalmalı; gerçek müşteri işleri (Hedef gibi) öne alınmalı.
