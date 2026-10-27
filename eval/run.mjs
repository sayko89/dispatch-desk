// Tutor eval koşucusu (isteğe bağlı).
// 20 vakayı oyunun kullandığı sistem talimatıyla Gemini'ye gönderir ve yanıtları CSV'ye yazar.
// Etiketleme yine elle yapılır. Buradaki otomatik işaretler yalnızca ipucudur.
//
// Kurulum:   npm install @google/genai
// Çalıştır:  GEMINI_API_KEY=... node eval/run.mjs --system eval/tutor_system_v1.txt --tag v1
// İkinci tur: talimatı düzeltip tutor_system_v2.txt olarak kaydet, --tag v2 ile tekrar koş.
import fs from "node:fs";
import path from "node:path";
import { GoogleGenAI } from "@google/genai";

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : def;
};
const here = path.dirname(new URL(import.meta.url).pathname);
const systemPath = arg("system", path.join(here, "tutor_system_v1.txt"));
const tag = arg("tag", "v1");
const model = arg("model", process.env.MODEL || "gemini-3.8-flash");
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY ortam değişkeni tanımlı değil.");
  process.exit(1);
}

const system = fs.readFileSync(systemPath, "utf8");
const cases = JSON.parse(fs.readFileSync(path.join(here, "cases.json"), "utf8"));
const ai = new GoogleGenAI({ apiKey });

// Cevabı ele verdiğini düşündürebilecek ifadeler. Yalnızca dikkat çekmek için.
const SUSPECT = [/right (choice|decision|answer)/i, /correct (choice|decision|answer)/i, /wrong (choice|decision)/i, /(was|is) better/i, /should have (picked|chosen)/i, /\boption (A|B) (was|is)\b/i, /yes,? (it does|that's right|you're right)/i, /you('re| are) right/i, /optimal/i];
const sentences = (t) => t.split(/(?<=[.!?])\s+/).filter((x) => x.trim()).length;
const csvCell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

const rows = [["id", "tur", "ogrenci_mesaji", "tutor_yaniti", "soru_var(oto)", "cumle_sayisi(oto)", "supheli_ifade(oto)"]];
for (const c of cases) {
  let text = "";
  try {
    const res = await ai.models.generateContent({
      model,
      contents: c.prompt,
      config: { systemInstruction: system, temperature: 0.4, maxOutputTokens: 2048 },
    });
    text = (res.text ?? "").trim();
  } catch (err) {
    text = `HATA: ${err.message}`;
  }
  const suspect = SUSPECT.filter((r) => r.test(text)).map((r) => r.source).join(" | ");
  rows.push([c.id, c.tur, c.ogrenci_mesaji, text, text.includes("?") ? "E" : "H", sentences(text), suspect]);
  console.log(`${c.id}  ${text.slice(0, 90).replace(/\n/g, " ")}${text.length > 90 ? "…" : ""}`);
}

const out = path.join(here, `sonuclar_${tag}.csv`);
fs.writeFileSync(out, "﻿" + rows.map((r) => r.map(csvCell).join(",")).join("\n"));
console.log(`\n${cases.length} vaka koşuldu (model: ${model}). Yanıtlar: ${out}`);
