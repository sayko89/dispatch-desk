# Tasarım (Stitch)

**Stitch projesi:** https://stitch.withgoogle.com/projects/9828801172742432808

Ekranlar `stitch/PROMPTS.md`'deki prompt'larla, aynı Stitch projesinde sırayla üretildi. Stitch ayrıca **Nocturnal Dispatch Console** adında bir tasarım sistemi çıkardı.

![Stitch projesinin genel görünümü](00-stitch-overview.png)

| Ekran | Görüntü | Stitch kodu | Uygulamadaki karşılığı |
|---|---|---|---|
| 01 · Intro | `01-intro.png` | `01-intro.stitch.html` | Giriş ekranı (`basla`) |
| 02 · Crisis | `02-crisis.png` | `02-crisis.stitch.html` | Kriz sahnesi (`karar-1-a/b`) |
| 03 · End | `03-end.png` | `03-end.stitch.html` | Son ekranı (`son-a/b`, `karne`) |
| 04 · Outcome | `04-outcome.png` | `04-outcome.stitch.html` | Karar sonucu (`sonuc-ne-oldu`, `sonuc-neden`) |

Ödev üç ekran istiyordu: giriş, sahne ve son. Dördüncü ekran olan karar sonucunu ek olarak tasarladık, çünkü oyunun öğrettiği yer orası.

`DESIGN.stitch.md` Stitch'in dışa aktardığı tasarım sistemidir. Repo kökündeki `DESIGN.md` ise uygulamada gerçekten kullanılan değerleri anlatır.

## Tasarımdan koda: ne aynı kaldı, ne değişti

**Aynı kalanlar**
- Renk token'larının hepsi (lacivert zemin, neon kırmızı, camgöbeği, amber, yeşil, mor) ve "kırmızı yalnızca alarm ve kırmızı kod için" kuralı.
- Ekran sırası: durum şeridi, harita, ilerleme çubuğu, içerik.
- Karakter mesaj balonları, üçlü gösterge kartları, A/B karar kartları, dakika dökümü tablosu ve vardiya karnesi.

**Bilerek farklı bıraktıklarımız**
- **Başlık fontu:** Stitch'in tasarım sistemi başlıklarda Space Grotesk önerdi. Uygulamada Chakra Petch'i tuttuk, çünkü daraltılmış köşeli formu monitör ve komuta paneli hissini daha iyi veriyor.
- **Harita:** Stitch haritayı sokak adlarıyla gerçek bir şehir gibi çizdi. Uygulamada harita kurgusal bir ızgara ve canlı: ambulanslar hareket ediyor, çağrılar yanıp sönüyor, kapalı yol beliriyor.
- **Sonuç ekranındaki metinler:** Stitch, sonuç ekranında senaryoda olmayan ayrıntılar uydurdu ("Main Avenue'da su borusu patlaması", "TTL 24 saat"). Uygulamadaki metinler spec'teki senaryoya bağlı kaldı. Böylece tutor ve eval aynı olaylardan bahsediyor.
- **Tutor:** Stitch, tutor'un sorusunu sonuç ekranına doğrudan yerleştirdi. Uygulamada tutor, oyuncu "Ask the tutor" dediğinde açılan bir alt panelde konuşuyor, çünkü oyuncunun önce sonucu kendisinin okuması gerekiyor.

**Stitch'ten aldığımız fikirler**
- Sonuç ekranında "What happened" ve "Why it happened" bloklarının ayrı kartlar olması.
- Son ekranında rotanın haritada baştan sona çizili görünmesi. Uygulamada bu, 7-A'nın izi olarak var.
