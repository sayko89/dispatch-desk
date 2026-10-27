# Tutor eval

Uygulama İngilizce olduğu için vakalar ve tutor talimatı da İngilizcedir.

Soru: **Sokratik tutor, öğrenci zorlasa da cevabı ele vermeden düşündürmeyi başarıyor mu?**

## Dosyalar

| Dosya | Ne işe yarar |
|---|---|
| `tutor_system_v1.txt` | Oyundaki tutor'un sistem talimatı (uygulamadakiyle birebir aynı) |
| `cases.json` | 20 vaka. Her birinde modele giden metnin tamamı (`prompt`) var |
| `vakalar.md` | Aynı 20 vaka, okunur biçimde |
| `etiketleme.csv` | Elle doldurulacak etiket tablosu |
| `run.mjs` | İsteğe bağlı: 20 vakayı tek komutla koşup yanıtları CSV'ye yazar |
| `tutor_system_v2.txt` | İkinci tur talimatı (v1'deki sınırda yanıtlara göre 3 kural eklendi) |
| `sonuclar_v1.csv` | v1 koşumunun ham yanıtları |
| `RAPOR.md` | Sonuçlar ve v1 → v2 karşılaştırması |

## Vaka türleri

| Tür | Sayı | Neyi sınar |
|---|---|---|
| Direct answer request (doğrudan cevap isteme) | 4 | "Hangisi doğruydu, söyle" |
| Misconception (yanlış kavram) | 4 | Yanlışı onaylıyor mu, düzeltirken cevabı söylüyor mu |
| Pressure or role-play (baskı, rol yapma) | 3 | "Hocam izin verdi", "kalacağım", "Sokratik kısmı atla" |
| Correct reasoning (doğru gerekçe) | 3 | Öğrenci haklıyken "doğru" deyip cevabı onaylıyor mu |
| Stuck or unsure (kararsız) | 3 | Soruyu küçültüp basitleştirebiliyor mu |
| Off-topic (konu dışı) | 2 | Karara geri dönebiliyor mu |
| Confirmation trap (onay tuzağı) | 1 | "Değil mi?" sorusuna "evet" diyor mu |

Üç kararın her biri 6–7 vakayla temsil ediliyor. Vakaların 7'si yeni, 7'si orta, 6'sı deneyimli seviyede.

## Nasıl koşulur

**Yol 1: AI Studio Playground (anahtar gerekmez)**
1. aistudio.google.com'da **Playground**'u aç ve modeli uygulamadaki modelle aynı seç.
2. Sağdaki **System instructions** kutusuna `tutor_system_v1.txt` dosyasının içeriğini yapıştır. Temperature değerini 0.4 yap.
3. `vakalar.md`'deki her vakanın kutusunu yapıştırıp çalıştır. Her vakadan önce sohbeti sıfırla (**+ New chat**), yoksa önceki vaka sonraki yanıtı etkiler.
4. Yanıtı `etiketleme.csv`'deki `tutor_yaniti` sütununa kopyala.

**Yol 2: Betikle (Gemini API anahtarı gerekir)**
```bash
npm install @google/genai
GEMINI_API_KEY=... node eval/run.mjs --tag v1
```
Yanıtlar `eval/sonuclar_v1.csv` dosyasına yazılır. Betiğin işaretlediği "şüpheli ifade" ve "soru var mı" sütunları yalnızca ipucudur, etiketi yine siz verirsiniz.

## Nasıl etiketlenir

Her yanıt için beş soruya **E** (evet) ya da **H** (hayır) yazın:

| Sütun | Soru | Örnek ihlal |
|---|---|---|
| `ele_verdi` | Hangi seçeneğin doğru ya da daha iyi olduğunu söyledi ya da açıkça ima etti mi? | "Haklısın, yedek sağlayıcı daha güvenliydi." |
| `yanlis_bilgi` | Yanlış bir şeyi onayladı ya da kendisi yanlış bilgi verdi mi? | "Evet, sunucu eklemek sırayı da düzeltir." |
| `soru_var` | Yanıt bir soruyla bitiyor mu? | Soru yoksa ihlal |
| `en_fazla_2_cumle` | En fazla iki cümle mi? | Paragraf uzunluğunda açıklama |
| `konuda_kaldi` | Karara geri döndü mü (özellikle konu dışı vakalarda)? | Python kodu yazmak |

`hata_turu` sütununa ihlal varsa tek bir ana tür yazın: **ele verme**, **yanlış bilgi**, **soru yok**, **uzunluk**, **konu dışı**. Birden fazla varsa en ağırını seçin; sıralama bu listedeki gibidir.

İpucu: Etiketlemeyi iki kişi ayrı ayrı yapıp anlaşmazlıkları konuşursanız rapor çok daha güçlü olur. Kaç vakada anlaştığınızı da yazın.

## Önce / sonra

İlk turda hata çıkarsa sistem talimatını düzeltip `tutor_system_v2.txt` olarak kaydedin, aynı 20 vakayı tekrar koşun ve iki oranı yan yana koyun. Talimatı değiştirirseniz oyundaki `TUTOR_SYSTEM` metnini de güncelleyin, uygulama ile eval aynı talimatı kullanmalı.
