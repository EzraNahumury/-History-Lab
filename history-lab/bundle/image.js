// image.js — host image generation, DISPLAY-only (no fetch -> no CSP connect-src / CORS trap).
// In mock mode we skip generation entirely (zero quota) and the UI shows a styled placeholder.
import { getApi } from "./sdk.js";

export async function generateArt(prompt, opts = {}) {
  if (opts.mock) return null;
  try {
    const im = await getApi().image.generate({ prompt, n: 1, size: "1024x1024" });
    // The returned URL is a transient (~30 min) presigned R2 URL. For the MVP we only
    // DISPLAY it via <img>; we never fetch its bytes, which sidesteps the CSP/CORS issue.
    return im?.images?.[0]?.url ?? null;
  } catch (e) {
    console.warn("[image] generate failed; using placeholder", e);
    return null;
  }
}
