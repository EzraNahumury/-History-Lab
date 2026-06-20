// sdk.js — connect to the Anna host runtime and expose a single API handle.
//
// The import path and call shapes below match the `anna-app init` scaffold:
//   - import { AnnaAppRuntime } from "/static/anna-apps/_sdk/latest/index.js"
//   - const anna = await AnnaAppRuntime.connect()
//   - anna.window.set_title({ title })          // object arg, not a string
//   - anna.storage.set({ key, value })
//   - anna.chat.append_artifact({ artifact })
import { AnnaAppRuntime } from "/static/anna-apps/_sdk/latest/index.js";

let _runtime = null;
let _api = null;
let _connected = false;

export async function connect() {
  _runtime = await AnnaAppRuntime.connect();
  // Some builds expose the host API on window.anna; others on the connect() return.
  _api = (typeof window !== "undefined" && window.anna) ? window.anna : _runtime;
  _connected = true;
  if (typeof window !== "undefined") window.__anna = _api; // for console debugging
  return _api;
}

export function isConnected() { return _connected; }

export function getApi() {
  if (!_api) throw new Error("[sdk] not connected — call connect() first");
  return _api;
}

export function getEntryPayload() {
  return _runtime?.entryPayload ?? _api?.entryPayload ?? null;
}

export async function setTitle(text) {
  try { await getApi().window.set_title({ title: text }); }
  catch (e) { console.warn("[sdk] set_title failed", e); }
}

export async function appendArtifact(artifact) {
  try { return await getApi().chat.append_artifact({ artifact }); }
  catch (e) { console.warn("[sdk] append_artifact failed", e); return null; }
}
