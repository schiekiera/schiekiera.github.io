// Data loading with a per-session shard cache. All fetches are relative to
// index.html, so the app works from any static file server.

const shardCache = new Map();

export async function fetchJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`fetch ${url}: HTTP ${r.status}`);
  return r.json();
}

export function loadIndex(lang) {
  return fetchJSON(`data/index_${lang}.json`);
}

export function loadCoords(lang) {
  return fetchJSON(`data/coords_${lang}.json`);
}

export function loadShard(lang, target) {
  const key = `${lang}/${target}`;
  if (!shardCache.has(key)) {
    shardCache.set(key, fetchJSON(`data/pairs/${lang}/${target}.json`));
  }
  return shardCache.get(key);
}
