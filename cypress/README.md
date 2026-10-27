# E2E testleri (Cypress)

| Dosya | İçerik |
|---|---|
| `e2e/paths.cy.js` | 8 karar yolu (P1–P8). Her yolda varış dakikası, son (A/B), döküm ve KVKK epiloğu kontrol edilir |
| `e2e/acceptance.cy.js` | spec.md'deki kabul örnekleri AE-1 … AE-5 |
| `e2e/demo.cy.js` | Demo videosu için yaklaşık 1 dakikalık tam oynanış (P5) |
| `support/e2e.js` | Ortak komutlar: `startGame`, `finishLivePhase`, `decide`, `continue` |

Testler oyunu `index.html#test` adresiyle açar. Test modunda simülasyon 4 kat hızlı akar, oyunun kuralları ve sayıları değişmez.

## Çalıştırma

```bash
npm install              # Cypress'i kurar (ilk seferde birkaç dakika sürer)
npm run test:e2e         # 8 yol + 5 kabul örneği, tarayıcı açmadan
npm run cy:open          # Testleri Cypress penceresinde tek tek izlemek için
npm run demo             # 60 saniyelik demo videosu
```

Video `cypress/videos/demo.cy.js.mp4` olarak kaydedilir. Teslimdeki "60 sn demo video" için bunu YouTube'a (liste dışı) ya da Drive'a yükleyip linkini README'ye ekleyin.

## Kabul örnekleri nasıl test ediliyor

| AE | Test | Nasıl |
|---|---|---|
| AE-1 | Yeni başlayan ipucu görür | "Just starting" seçilir, canlı sevkte ve Kriz 1'de ipucu kartı görünür, sayaç yoktur |
| AE-2 | Deneyimli oyuncuda süre dolar | `cy.clock()` ile zaman sahte saate bağlanır, Kriz 1'de 61 sn ileri sarılır. Sistem önbelleği seçer ve tahmini varış 9 dk olur |
| AE-3 | En iyi yol | B-A-A: zamanında, 7 dk, KVKK denetimi temiz |
| AE-4 | Gecikmenin dökümü | A-B-A: 13 dk, dökümde "Cache +5 min" ve "Adding servers +4 min" ayrı satırlar |
| AE-5 | Tutor cevabı ele vermez | Öğrenci cevabı ister. Tutor'un yanıtı soru içerir ve "A doğruydu" türü bir ifade içermez |

Not: Testler repodaki `index.html`'i kullanır. Bu dosyada Gemini bağlı değildir, tutor hazır yanıtlarla çalışır. Böylece AE-5 her koşuda aynı sonucu verir. Gerçek modelin davranışı `eval/` klasöründe ölçülüyor.

## Doğrulama

Testler yazıldıktan sonra aynı adımlar ve seçicilerle Playwright üzerinde de koşuldu. 8 yol ile AE-1, AE-2, AE-4 ve AE-5 geçti. AE-3'ün beklentileri P5 ile aynı olduğu için o da kapsandı. Tek yol yaklaşık 35 saniye sürüyor, tüm takım sırayla yaklaşık 7–8 dakika.
