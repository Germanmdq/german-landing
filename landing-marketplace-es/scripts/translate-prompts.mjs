import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourceDir = path.resolve('..', 'websiteprompts-report-2026-10-19', 'prompts');
const outDir = path.join(root, 'prompts-es');
await fs.mkdir(outDir, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function protect(text) {
  const saved = [];
  const stash = (value) => {
    const token = `ZXQ${String(saved.length).padStart(5, '0')}QXZ`;
    saved.push(value);
    return token;
  };
  let masked = text.replace(/`([^\n`]+)`/g, (full, inner) => {
    const technical =
      inner.startsWith('--') ||
      /[{}<>;=]/.test(inner) ||
      /\w+\([^)]*\)/.test(inner) ||
      /^(scale|translate|rotate|opacity|pathLength|prefers-reduced-motion|motion\/react|lucide-react)(\s|$)/i.test(inner) ||
      /^\d+(px|rem|em|vh|vw|%)$/i.test(inner);
    return technical ? stash(full) : full;
  });
  masked = masked.replace(/https?:\/\/[^\s)\]}>]+/g, stash);
  masked = masked.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, stash);
  masked = masked.replace(/--[a-zA-Z0-9_-]+/g, stash);
  masked = masked.replace(/#[0-9A-Fa-f]{3,8}\b/g, stash);
  masked = masked.replace(/\bclamp\([^)]*\)/g, stash);
  masked = masked.replace(/\bcubic-bezier\([^)]*\)/g, stash);
  // Preserve line structure exactly while allowing visible copy to be translated.
  masked = masked.replace(/\n+/g, stash);
  return { masked, saved };
}

function restore(text, saved) {
  return text.replace(/ZXQ(\d{5})QXZ/g, (_, n) => saved[Number(n)] ?? _);
}

function chunkText(text, max = 2200) {
  const chunks = [];
  const parts = text.match(/\S+\s*/g) || [text];
  let current = '';
  for (const part of parts) {
    if (current && current.length + part.length > max) {
      chunks.push(current);
      current = '';
    }
    current += part;
  }
  if (current) chunks.push(current);
  return chunks;
}

async function translateChunk(text, attempt = 0) {
  if (!text.trim()) return text;
  const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=' + encodeURIComponent(text);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return (data?.[0] || []).map((p) => p?.[0] || '').join('');
  } catch (err) {
    if (attempt >= 4) throw err;
    await sleep(700 * (attempt + 1));
    return translateChunk(text, attempt + 1);
  }
}

async function translateText(input) {
  const parts = input.split(/(```[\s\S]*?```)/g);
  const out = [];
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith('```')) {
      out.push(part);
      continue;
    }
    const { masked, saved } = protect(part);
    const translated = [];
    for (const chunk of chunkText(masked)) {
      translated.push(await translateChunk(chunk));
      await sleep(45);
    }
    out.push(restore(translated.join(''), saved));
  }
  return out.join('');
}

let files = (await fs.readdir(sourceDir)).filter((f) => f.endsWith('.md')).sort();
if (process.env.FILES) {
  const wanted = new Set(process.env.FILES.split(',').map((s) => s.trim()).filter(Boolean));
  files = files.filter((f) => wanted.has(f));
}
if (process.env.MAX_FILES) files = files.slice(0, Number(process.env.MAX_FILES));
let done = 0;
let cursor = 0;
async function worker() {
  while (true) {
    const index = cursor++;
    if (index >= files.length) return;
    const file = files[index];
    const src = await fs.readFile(path.join(sourceDir, file), 'utf8');
    const translated = await translateText(src);
    await fs.writeFile(path.join(outDir, file), translated);
    done++;
    console.log(`[${done}/${files.length}] ${file} -> ${translated.length} chars`);
  }
}
const concurrency = Math.max(1, Number(process.env.CONCURRENCY || 8));
await Promise.all(Array.from({ length: concurrency }, () => worker()));
console.log(`DONE: ${done} prompts traducidos a ${outDir}`);
