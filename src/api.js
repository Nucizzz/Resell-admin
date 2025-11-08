const BASE = import.meta.env.VITE_API_BASE;

export async function getPing() {
  const r = await fetch(`${BASE}/ping`);
  return r.json();
}

export async function scanBarcode(barcode) {
  const r = await fetch(
    `${BASE}/inventory/scan/${encodeURIComponent(barcode)}`
  );
  if (!r.ok) return null;
  return r.json();
}

export async function createPurchase(payload) {
  const r = await fetch(`${BASE}/inventory/purchases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return r.json();
}

export async function createSale(payload) {
  const r = await fetch(`${BASE}/inventory/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return r.json();
}

export async function createProduct(payload) {
  const r = await fetch(`${BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return r.json();
}
