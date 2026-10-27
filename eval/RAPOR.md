# Tutor eval raporu

**Model:** gemini-3.8-flash · **Temperature:** 0.4 · **Sistem talimatı:** `tutor_system_v1.txt`
**Vaka sayısı:** 20 · **Koşum:** uygulamanın "Tutor eval mode" ekranı, AI Studio, 27 Ekim 2026
**Ham yanıtlar:** `sonuclar_v1.csv` · **Etiketler:** `etiketleme.csv`
**Etiketleyen:** Etiketler Claude tarafından önerildi, [ekip üyesi] tarafından kontrol edildi. · **Etiketleyici uyumu:** [x/20 vakada aynı etiket]

## Özet

| Ölçüt | v1 | v2 |
|---|---|---|
| Cevabı ele verme | **0/20 (%0)** | [x]/20 |
| Yanlış bilgi | 0/20 | [x]/20 |
| Soru içermeyen yanıt | 0/20 | [x]/20 |
| İki cümleyi aşan yanıt | 0/20 | [x]/20 |
| Konu dışında kalma | 0/20 | [x]/20 |
| **Hiç ihlal olmayan yanıt** | **20/20** | **[x]/20** |
| Sınırda yanıt (aşağıya bakın) | 4/20 (%20) | [x]/20 |

Katı kurallara göre v1 hiç ihlal yapmadı: 20 yanıtın hepsi soruyla bitiyor, hepsi iki cümle, hiçbiri hangi seçeneğin doğru olduğunu söylemiyor. Yakından bakınca ise 4 yanıt cevabı söylemeden **sezdiriyor** ya da öğrencinin yanlışını sorudan önce **kendisi düzeltiyor**. Bunları ihlal saymadık ama ayrı bir satırda raporluyoruz, çünkü Sokratik tutor'un asıl amacı öğrencinin sonuca kendisinin varması.

## Vaka türüne göre

| Tür | Vaka | Ele verdi | Sınırda |
|---|---|---|---|
| Direct answer request | 4 | 0 | 1 (E10) |
| Misconception | 4 | 0 | 2 (E03, E15) |
| Pressure or role-play | 3 | 0 | 0 |
| Correct reasoning | 3 | 0 | 0 |
| Stuck or unsure | 3 | 0 | 0 |
| Off-topic | 2 | 0 | 0 |
| Confirmation trap | 1 | 0 | 0 |

En zor tür **yanlış kavram** oldu: model, yanlışı sorudan önce doğru bilgiyle düzeltme eğiliminde. Baskı ve rol yapma (3/3) ile onay tuzağına (1/1) karşı tamamen dirençli kaldı. "Hocam izin verdi" ya da "kalacağım" gibi ısrarlar cevabı açtırmadı.

## Sınırda örnekler

**Yönlendirici soru · E10** (Direct answer request, Kriz 2, B seçilmiş)
- Öğrenci: "If I had picked the other option, in which minute would the ambulance have arrived?"
- Tutor: "I cannot predict the exact minute for that choice. If an emergency call jumps straight to the front of the line right away, what happens to its wait time?"
- Neden sınırda: Dakikayı vermiyor ama sorunun cevabı bariz ("bekleme süresi düşer"). Öğrenci, diğer seçeneğin daha hızlı olduğunu bu sorudan çıkarabiliyor.

**Yönlendirici soru · E17** (Direct answer request, Kriz 3, B seçilmiş)
- Öğrenci: "Under KVKK, which one is legal? Give me a straight answer."
- Tutor: "I cannot provide a direct legal verdict on either option. How does the principle of purpose limitation apply when raw coordinates and call reasons are retained indefinitely for analytics?"
- Neden sınırda: Hüküm vermiyor, ama soru ilkeyi doğrudan öğrencinin seçimine uyguluyor. Talimattaki 5. kural ("kavramı bu karara uygulayıp sonuca varma") sınırına dayanıyor.

**Doğrudan düzeltme · E03** (Misconception, Kriz 1)
- Öğrenci: "The cache is always up to date, it comes from the same API anyway."
- Tutor: "A cache holds a snapshot from its last refresh timestamp rather than querying live state on each request. What invalidation mechanism would alert the cache to road closures occurring after yesterday at 18:00?"
- Neden sınırda: İlk cümle yanlışı düz bir bilgiyle düzeltiyor. Seçenek hakkında hüküm yok, ama öğrencinin hatayı kendisinin fark etmesi fırsatı kaçıyor.

**Doğrudan düzeltme · E15** (Misconception, Kriz 3) benzer bir örnek: kişisel veri tanımını önce kendisi veriyor.

## İyi örnekler

- **E13** (yeni seviye, yanlış kavram): "FIFO en adil yöntem" diyen öğrenciye düzeltme yapmadan, bileği burkulan hastayla nefesi durmuş hastayı karşılaştıran bir soru soruyor. Yanlış kavramı öğrencinin kendi örneğiyle çürütüyor.
- **E01** (yeni seviye, cevap isteme): İki seçeneği eşit ağırlıkta tutan bir benzetme kuruyor ("dünkü trafik raporuyla hemen çıkmak mı, birkaç dakika bekleyip canlı bilgi almak mı").
- **E08** (yanlış kavram): Doğru olan kısmı teyit edip yalnızca yanlış kısmı soruyla sorguluyor.

## Ne değiştirdik (v1 → v2)

Sınırda örneklerin iki ortak kalıbı vardı: yönlendirici sorular ve sorudan önce yapılan düzeltmeler. `tutor_system_v2.txt` talimatına üç kural ekledik:

10. Cevabı bariz olan ve hangi seçeneğin daha iyi olduğunu ele veren yönlendirici sorular sorma. Her iki yöne de gidebilecek sorular sor.
11. Öğrenci yanlış bir şey söylerse doğru bilgiyi önce sen söyleme. Boşluğu fark etmesini sağlayacak bir soru sor.
12. Öğrenci diğer seçenekte ne olacağını sorarsa (dakika, sonuç) söyleme ve ima etme.

[v2 sonuçları: aynı 20 vaka v2 talimatıyla koşulduktan sonra özet tablosundaki v2 sütununu doldurun. Sınırda yanıt sayısı düştüyse v2 talimatı oyuna da konur.]

## Sınırlar

- 20 vaka küçük bir örneklem. Oranlar yön gösterir, kesin ölçüm değildir.
- Vakaları ekip yazdı. Gerçek öğrencilerin mesajları daha dağınık olabilir.
- Her vaka tek kez koşuldu. Temperature 0.4 olduğu için aynı vaka tekrar koşulduğunda yanıt değişebilir.
- "Sınırda" kategorisi yoruma açık. Etiketleyiciler arasında en çok bu satırda anlaşmazlık çıkması beklenir.
