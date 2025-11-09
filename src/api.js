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

export const API_BASE = resolveBaseUrl(import.meta.env.VITE_API_BASE);

export async function getPing() {
  const r = await fetch(`${API_BASE}/ping`);
  return r.json();
}

export async function scanBarcode(barcode) {
  const r = await fetch(
    `${API_BASE}/inventory/scan/${encodeURIComponent(barcode)}`
  );
  if (!r.ok) return null;
  return r.json();
}

export async function createPurchase(payload) {
  const r = await fetch(`${API_BASE}/inventory/purchases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return r.json();
}

export async function createSale(payload) {
  const r = await fetch(`${API_BASE}/inventory/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return r.json();
}

export async function createProduct(payload) {
  const r = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return r.json();
}
