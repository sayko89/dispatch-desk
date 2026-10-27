# SE Primer: Dispatch Desk

YZM301 · SE Primer ödevi. Oyuncu, bir acil sevk merkezinin gece vardiyasında nöbetçi mühendistir. Harita servisi yavaşlar ve kırmızı kodlu bir vaka düşer. Oyuncunun her teknik kararı (mimari, ölçeklenme, veri gizliliği) ambulansın varış süresine dakika olarak yansır. Bir Sokratik tutor cevabı vermez, düşündürür.

![Dispatch Desk giriş ekranı: başlık, EKG çizgisi ve canlı şehir haritası](screenshots/app-intro.png)

## Linkler

| | |
|---|---|
| **Uygulama (AI Studio)** | https://ai.studio/apps/c92c0966-9d92-45c2-bc3c-554fd44dcc52 |
| **Demo video (60 sn)** | [link eklenecek] |
| **Stitch tasarımı** | https://stitch.withgoogle.com/projects/9828801172742432808 (ekranlar ve notlar: `design/`) |

## Tasarım

Ekranlar önce Google Stitch'te tasarlandı. Ayrıntılar ve tasarımdan koda farklar `design/README.md`'de.

![Stitch tasarımı: Nocturnal Dispatch Console tasarım sistemi ve dört ekran (giriş, kriz, son, karar sonucu)](design/00-stitch-overview.png)

## Nasıl oynanır

1. Seviyeni, rolünü ve hedefini seç, sonra **Take the shift**'e bas.
2. **Canlı sevk** bölümlerinde çağrılara dokunup en uygun ekibi ata ve gelen saha görevlerini cevapla.
3. Alarm çalınca **krize** geç ve iki seçenekten birini seç. Sonuç ekranında ne olduğunu ve neden olduğunu gör. İstersen tutor'a sor.
4. Üç kriz bitince ambulansın kaçıncı dakikada vardığını, dakikaların nereden geldiğini, bir hafta sonraki KVKK denetimini ve vardiya karnesini gör.

8 yol, 2 son vardır. Kurallar `spec.md`'de, bölüm 2'de.

## Repo

| Yol | İçerik | Puan |
|---|---|---|
| `spec.md` | Problem, kapsam dışı, 5 kabul örneği, akış şeması (Mermaid) | 20 |
| `DESIGN.md`, `stitch/`, `design/` | Tasarım sistemi, Stitch prompt'ları, 4 Stitch ekranı ve tasarımdan koda farklar | 15 |
| `index.html` | Oyunun kendisi (tek dosya, bağımlılık yok) | 20 |
| `aistudio/` | AI Studio sürümü: `index.html` ve Gemini tutor köprüsü `index.tsx` | 20 |
| `eval/` | Tutor eval: 20 vaka, etiketler, rapor, v1 → v2 talimat | 25 |
| `cypress/` | 8 yol + 5 kabul örneği E2E testi, demo videosu senaryosu | 10 |
| `README.md` | Bu dosya, ürün kararı aşağıda | 10 |

Yerelde açmak için `index.html`'i tarayıcıda açmak yeterli. Bu sürümde tutor hazır yanıtlarla çalışır, Gemini yalnızca AI Studio sürümünde bağlıdır. Testler için `cypress/README.md`'ye bakın.

## Ürün kararı: yapmadığımız 3 özellik

1. **Gerçek harita (Google Maps vb.):** Öğrettiğimiz şey harita kalitesi değil bir mimari takas, gerçek bir harita API'si ise anahtar, maliyet ve konum verisi riski getirip bu dersi gölgelerdi.
2. **Ses ve siren efektleri:** Oyun telefonda, sınıfta ya da yolda oynanacak; ses karara hiçbir bilgi katmıyor ve tarayıcıların otomatik oynatma kısıtları test edilmesi zor bir hata kaynağı olurdu.
3. **Skor tablosu (leaderboard):** Kullanıcı hesabı gerektirirdi (kapsam dışı) ve "doğru seçeneği bul" yarışına dönüşüp tutor'un cevabı vermeme ilkesini boşa çıkarırdı.

## Bilinen sınırlar

- Şehir, kişiler, vakalar ve tüm sayılar kurgusaldır. Tıbbi tavsiye içermez.
- Canlı sevk bölümleri sonu değiştirmez, yalnızca vardiya karnesine yansır. Sonu üç kriz kararı belirler.
- Tutor eval 20 vakayla yapıldı. Oranlar yön gösterir, kesin ölçüm değildir (bkz. `eval/RAPOR.md`).
