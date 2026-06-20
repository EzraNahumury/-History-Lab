// sdk.js — connect to the Anna host runtime and expose a single API handle.
//
// IMPORTANT: this import path is the documented one. If `anna-app dev` scaffolds a
// different SDK path in the generated bundle/index.html, MATCH that path here.
import { AnnaAppRuntime } from "/static/anna-apps/_sdk/latest/index.js";

let _runtime = null;
let _api = null;
let _connected = false;

export async function connect() {
  _runtime = await AnnaAppRuntime.connect();
  // Some builds expose the host API on window.anna; others on the connect() return.
  _api = (typeof window !== "undefined" && window.anna) ? window.anna : _runtime;
  try { await _api?.window?.hello?.(); } catch (e) { console.warn("[sdk] window.hello", e); }
  try { await _api?.window?.ready?.(); } catch (e) { console.warn("[sdk] window.ready", e); }
  _connected = true;
  // expose for console debugging
  if (typeof window !== "undefined") window.__anna = _api;
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
  try { await getApi().window.set_title(text); }
  catch (e) { console.warn("[sdk] set_title failed", e); }
}

export async function appendArtifact(artifact) {
  try { return await getApi().chat.append_artifact({ artifact }); }
  catch (e) { console.warn("[sdk] append_artifact failed", e); return null; }
}
