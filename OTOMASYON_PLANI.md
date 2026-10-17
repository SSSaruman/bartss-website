# BARTSS Otomasyon Planı (Claude için görev tanımı)

Bu belge, BARTSS sitesinde anlatılan her hizmeti bir panele ve otomasyona dönüştürmek için Claude'a verilecek tasarım ve uygulama brief'idir.

## 0. Temel ilke

- Otomasyon üretir, hazırlar, kontrol eder, raporlar.
- **Onayı yalnızca insan verir.** Hiçbir çıktı müşteriye gönderilmez, yayınlanmaz, faturalanmaz ya da dış sisteme yazılmaz; önce onay kapısından geçer.
- Her adım kayıt altına alınır (kim, ne zaman, hangi girdiyle, hangi sürüm).
- Sitede verilen sözler sistem kuralı olarak uygulanır:
  1. Mesaja **1 iş günü içinde dönüş**
  2. **İlk hafta ilk tasarım yönü**
  3. **Onay olmadan ilerlenmez**
  4. **Kaynak dosyalar teslim edilir**
  5. Fiyat ve kapsam **yazılı teklif** olarak gider (KDV hariç)

## 1. Roller

| Rol | Yetki |
|---|---|
| **Onaylayıcı (insan)** | Tüm onay kapıları, teklif gönderimi, teslim, istisnalar |
| **Tasarımcı (insan, opsiyonel)** | Otomasyon çıktısını düzenler, reddeder, yönlendirir |
| **Orkestratör ajan (Claude)** | İş akışını yürütür, alt ajanlara iş dağıtır, onay talebi açar |
| **Alt ajanlar** | Araştırma, metin, tasarım brief'i, görsel/video üretim çağrısı, QA, raporlama |
| **Müşteri** | Brief gönderir, onay linkinden yorum yapar (panele giriş zorunlu değil) |

## 2. Panel (tek ekran, 6 bölüm)

1. **Gelen talepler:** form ve WhatsApp'tan gelen brief'ler, durum etiketi (Yeni, Taslak teklif hazır, Onay bekliyor, Gönderildi, Kaybedildi).
2. **Onay kuyruğu:** insanın karar vermesi gereken her şey tek listede. Her satır: ne, hangi müşteri, ne kadar süredir bekliyor, önizleme, **Onayla / Düzelt / Reddet**.
3. **Projeler:** hizmet bazlı kanban (Analiz, Strateji ve Plan, Üretim, Onay ve Yayın), müşteri bazlı filtre.
4. **Çıktı kütüphanesi:** üretilen metin, görsel, video, dosya; sürüm geçmişi; müşteriye açık paylaşım linki.
5. **Takvim ve SLA:** 1 iş günü yanıt sayacı, ilk hafta yön teslimi sayacı, geciken işler kırmızı.
6. **Kayıt ve rapor:** her otomasyon çalışmasının günlüğü, maliyet, süre, hata; haftalık özet.

Panel gereksinimleri: Türkçe arayüz, rol bazlı erişim, her onayın e-posta/WhatsApp bildirimi, mobilde tek elle onay, tüm işlemlerin denetim günlüğü.

## 3. Ortak iş akışı (her hizmet bunu kullanır)

```
Talep geldi
  → [OTO] brief'i yapılandır (hizmet, kapsam, bütçe, ton, süre, eksikler)
  → [OTO] eksik bilgi sorusu taslağı
  → [İNSAN ONAY #1] sorular ve ön değerlendirme
  → [OTO] Analiz (araştırma, rakip, referans)
  → [OTO] Strateji ve plan, kapsam, takvim, fiyat taslağı
  → [İNSAN ONAY #2] yazılı teklif (KDV hariç) müşteriye gitmeden
  → müşteri teklifi onaylar
  → [OTO] Üretim (hizmete özel, bölüm 4)
  → [OTO] Kalite kontrol listesi
  → [İNSAN ONAY #3] her teslim ara çıktısı
  → [OTO] müşteri önizleme linki
  → müşteri geri bildirimi → [OTO] revizyon taslağı → [İNSAN ONAY #4]
  → [OTO] kaynak dosyaları paketle
  → [İNSAN ONAY #5] final teslim
  → [OTO] teslim, arşiv, memnuniyet sorusu
```

Kural: hiçbir adım, bir önceki onay kapısı kapanmadan başlamaz.

## 4. Hizmet bazlı otomasyonlar

### 4.1 Marka ve Görsel Kimlik (başlangıç 45.000 ₺, proje başına)
Sitede verilen teslimatlar: marka stratejisi, logo ve varyasyonlar, renk/tipografi/görsel dil, marka kılavuzu, kurumsal materyaller, kaynak dosyalar.

| Adım | Otomasyon | İnsan onayı |
|---|---|---|
| Analiz | Sektör, rakip ve hedef kitle araştırması; rakip logo/renk haritası | Araştırma özeti |
| Strateji | Konumlandırma cümlesi, ton, 3 marka yönü taslağı | Seçilen yön |
| Üretim | Logo konseptleri için üretim brief'i ve araç çağrısı, renk paleti ve tipografi önerisi, uygulama mockup'ları | Her konsept turu |
| Kılavuz | Marka kılavuzunu şablondan otomatik derle (logo kullanımı, boşluk, renk kodları) | Kılavuz taslağı |
| Materyaller | Kartvizit, antetli, sunum şablonları üret | Baskıya gitmeden |
| Teslim | Dosya paketi (SVG, PDF, PNG, kaynak) ve adlandırma kontrolü | Final |

### 4.2 Web ve UI/UX (başlangıç 30.000 ₺, proje başına)
Teslimatlar: bilgi mimarisi, UI ve responsive sistem, randevu/talep akışı, etkileşim ve prototip, SEO'ya hazır yapı, geliştirme ve yayın desteği.

| Adım | Otomasyon | İnsan onayı |
|---|---|---|
| Analiz | Mevcut site taraması (hız, mobil, erişilebilirlik, SEO), rakip karşılaştırması | Denetim raporu |
| Strateji | Site haritası, sayfa başına amaç ve CTA planı | Site haritası |
| Üretim | Ekran tasarımı (masaüstü/mobil), bileşen sistemi, kod iskeleti, form ve WhatsApp yönlendirmesi | Her ekran turu |
| QA | Otomatik kontrol: kırık bağlantı, 404, alt metin, başlık hiyerarşisi, Lighthouse, 390px taşma | QA raporu |
| SEO/GEO | Title, description, canonical, Open Graph, JSON-LD, sitemap, robots, llms.txt üretimi | Meta metinleri |
| Yayın | Dağıtım ön kontrolü, HTTPS ve yönlendirme listesi | Yayına alma |

### 4.3 3D ve Motion (teklif, kapsama göre)
Teslimatlar: 3D modelleme, sahne ve ışık, karakter tasarımı, motion, ürün filmi, teslim formatları.

| Adım | Otomasyon | İnsan onayı |
|---|---|---|
| Analiz | Referans toplama, mood board, teknik gereksinim listesi | Mood board |
| Strateji | Storyboard ve sahne listesi, süre/format planı | Storyboard |
| Üretim | Sahne bazlı üretim görevleri, önizleme render'ları, animasyon taslakları | Her sahne önizlemesi |
| QA | Çözünürlük, süre, format, kare hızı, renk kontrolü | QA raporu |
| Teslim | Video ve görsel formatlarının dönüştürülmesi, adlandırma, paketleme | Final |

### 4.4 AI ve Otomasyon (AI reklam filmi 12.000 ₺'den, film başına)
Teslimatlar: AI reklam filmi, görsel ve kampanya üretimi, içerik planlama, onay akışı, üretim sistemi kurulumu.

| Adım | Otomasyon | İnsan onayı |
|---|---|---|
| Analiz | Marka, kitle, kanal ve rakip reklam incelemesi | Hedef özeti |
| Strateji | Senaryo (3 alternatif), sahne listesi, dış ses metni, müzik/ton önerisi | Seçilen senaryo |
| Üretim | Sahne başına AI görsel/video üretim çağrıları, tutarlılık kontrolü (karakter, renk, logo), kurgu taslağı | Her sahne ve ilk kurgu |
| Hak ve güvenlik | Marka adı, logo, kişi benzerliği, telif kontrol listesi | Hukuki kontrol |
| Teslim | Dikey ve yatay formatlar, altyazı, kaynak paket | Final |

Not: Görsel ve video üretimi için dış üretim araçlarına API bağlantısı gerekir. Claude metin, planlama, kontrol ve orkestrasyon yapar; görüntüyü üreten araç ayrı bağlanır. Hangi aracın kullanılacağı projeye göre seçilir.

### 4.5 Sosyal Medya Tasarımı (başlangıç 25.000 ₺, aylık)
Teslimatlar: yayın dili, şablon seti, aylık içerik takvimi, kampanya tasarımları, hareketli içerik, kaynak dosyalar.

| Adım | Otomasyon | İnsan onayı |
|---|---|---|
| Analiz | Mevcut hesap analizi (içerik tipi, tutarlılık, etkileşim) | Analiz özeti |
| Strateji | Aylık içerik takvimi ve içerik sütunları | Takvim |
| Üretim | Metin, görsel brief'i, şablon doldurma, kapak ve hikâye varyasyonları | Haftalık toplu onay |
| QA | Marka kuralı kontrolü (renk, font, logo alanı), yazım denetimi | QA raporu |
| Teslim | Yayına hazır paket ve aylık özet raporu | Aylık teslim |

## 5. Sitenin kendisi için otomasyonlar

1. **Gelen talep:** iletişim formu ve WhatsApp mesajı → sınıflandırma → eksik sorular → taslak yanıt. Yanıt sayacı 1 iş günü.
2. **Teklif hazırlama:** brief ve fiyat tablosundan teklif taslağı (KDV hariç, kapsam, takvim, teslimatlar). Gönderim insan onayıyla.
3. **Blog ve notlar:** konu önerisi → taslak → görsel brief → SEO alanları. Yayın insan onayıyla.
4. **SEO/GEO bakımı (haftalık):** kırık bağlantı, 404, sitemap ve robots, meta eksikleri, JSON-LD doğrulaması, Lighthouse karşılaştırması. Bulgular panele düşer, otomatik değişiklik yapılmaz.
5. **İçerik tutarlılığı:** hizmet sayfalarındaki fiyat, süre ve söz metinlerinin ana sayfayla aynı kaldığını denetler.
6. **KVKK:** talep verisi saklama süresi dolunca silme/anonimleştirme önerisi çıkarır, silme işlemini onaya sunar.
7. **Müşteri iletişimi:** onay bekleyen müşteriye hatırlatma taslağı, teslim sonrası memnuniyet mesajı taslağı.

## 6. Güvenlik ve sınırlar

- Ödeme, fatura, sözleşme imzası, kişisel veri silme ve dış hesaplara yayın: **her zaman insan onayı**.
- API anahtarları ve gizli bilgiler panelde ve günlüklerde gösterilmez.
- Müşteri verisi yalnızca KVKK metninde belirtilen amaçla işlenir.
- Otomasyon emin olmadığı durumda varsayım yapmaz, onay kuyruğuna soru olarak düşer.
- Her otomasyonun bir **durdurma düğmesi** ve **maliyet limiti** olur.
- Müşteriye giden her mesaj, insan onayı alana kadar taslak durumunda kalır.

## 7. Claude'dan istenen çıktılar

1. Panelin çalışan ilk sürümü (6 bölüm, Türkçe, rol bazlı erişim).
2. Her hizmet için ayrı iş akışı tanımı (bölüm 4), adım şablonları ve kontrol listeleri.
3. Onay kapılarının veri modeli: talep, proje, adım, çıktı sürümü, onay, yorum, günlük.
4. Gelen talep akışı: site formu, WhatsApp ve e-posta bağlantısı.
5. Haftalık site denetim işi (bölüm 5.4) ve rapor ekranı.
6. Teklif şablonu (ana sayfadaki fiyatlarla uyumlu).
7. Kurulum notu: hangi hizmetlere (e-posta, WhatsApp, depolama, görsel/video üretim aracı) bağlanılacağı ve hangi bilgilerin sahibinden istenecek olduğu.

## 8. Başlamadan önce sahibinden alınacak bilgiler

- WhatsApp numarası, e-posta, telefon, alan adı (`site-extras.js` içindeki AYARLAR)
- KVKK için ünvan ve adres
- Kullanılacak yapay zekâ görsel/video araçları ve API erişimi
- Onaylayıcı kişi(ler) ve yedek onaylayıcı
- Çalışma saatleri ve resmi tatiller (1 iş günü sayacı için)
- Teklif ve sözleşme şablonları

## 9. İlk 4 haftalık uygulama sırası

1. **Hafta 1:** Panel iskeleti, gelen talep akışı, onay kuyruğu, denetim günlüğü.
2. **Hafta 2:** Ortak iş akışı ve teklif hazırlama, SLA sayaçları.
3. **Hafta 3:** Marka, Web ve Sosyal Medya hizmet akışları.
4. **Hafta 4:** AI ve 3D/Motion akışları, site denetim işi, raporlar.
