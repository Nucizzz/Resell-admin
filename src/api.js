const DEFAULT_BASE =
  typeof window !== "undefined" && window.location
    ? `${window.location.origin}/api`
    : "/api";

function resolveBaseUrl(value) {
  if (!value || typeof value !== "string") return DEFAULT_BASE;
  const trimmed = value.trim();
  if (!trimmed) return DEFAULT_BASE;
  return trimmed.replace(/\/+$/, "");
}

const CONFIGURED_BASE = resolveBaseUrl(import.meta.env.VITE_API_BASE);
const BASE_CANDIDATES = Array.from(
  new Set([DEFAULT_BASE, CONFIGURED_BASE].filter(Boolean))
);


export const API_BASE = BASE_CANDIDATES[0];
export const API_BASE_FALLBACKS = BASE_CANDIDATES.slice(1);

async function request(path, init) {
  if (!path.startsWith("/")) {
    throw new Error("API path must start with /");
  }

  let lastError;
  for (const base of BASE_CANDIDATES) {
    try {
      const response = await fetch(`${base}${path}`, init);
      return response;
    } catch (error) {
      if (error instanceof TypeError) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }

  throw lastError ?? new Error("API request failed");
}

export async function getPing() {
  const r = await request("/ping");
export const API_BASE = resolveBaseUrl(import.meta.env.VITE_API_BASE);

export async function getPing() {
  const r = await fetch(`${API_BASE}/ping`);
  return r.json();
}

export async function scanBarcode(barcode) {
  const r = await request(
    `/inventory/scan/${encodeURIComponent(barcode)}`
  const r = await fetch(
    `${API_BASE}/inventory/scan/${encodeURIComponent(barcode)}`
  );
  if (!r.ok) return null;
  return r.json();
}

export async function createPurchase(payload) {
  const r = await request("/inventory/purchases", {
  const r = await fetch(`${API_BASE}/inventory/purchases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return r.json();
}

export async function createSale(payload) {

  const r = await request("/inventory/sales", {
  const r = await fetch(`${API_BASE}/inventory/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return r.json();
}

export async function createProduct(payload) {

  const r = await request("/products", {
  const r = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return r.json();
}
