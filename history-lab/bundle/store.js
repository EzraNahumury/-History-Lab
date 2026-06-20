// store.js — durable run state in anna.storage (etag / if_match concurrency).
// All writes are best-effort: if storage is unavailable (e.g. pure offline mock),
// the app keeps an in-memory copy so the demo never breaks.
import { getApi } from "./sdk.js";

const mem = new Map(); // in-memory fallback

export async function loadRun(key) {
  try {
    const g = await getApi().storage.get({ key });
    if (g && g.exists) return { value: g.value, etag: g.etag };
  } catch (e) {
    console.warn("[store] storage.get failed, using memory", e);
    if (mem.has(key)) return { value: mem.get(key).value, etag: mem.get(key).etag };
  }
  return null;
}

export async function saveRun(key, value, etag) {
  // keep a memory copy regardless
  const memEtag = "mem-" + (Number(etag?.replace?.("mem-", "")) + 1 || 1);
  try {
    const args = { key, value };
    if (etag && !String(etag).startsWith("mem-")) args.if_match = etag;
    const w = await getApi().storage.set(args);
    mem.set(key, { value, etag: w?.etag });
    return w?.etag ?? memEtag;
  } catch (e) {
    // precondition_failed or offline -> fall back to memory
    console.warn("[store] storage.set failed, using memory", e);
    mem.set(key, { value, etag: memEtag });
    return memEtag;
  }
}
