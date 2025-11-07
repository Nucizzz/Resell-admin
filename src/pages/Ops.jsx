import React, { useState } from "react";
import { scanBarcode, createPurchase, createSale } from "../api";
import ScanInput from "../components/ScanInput";

export default function Ops() {
  const [barcode, setBarcode] = useState("");
  const [resolved, setResolved] = useState(null);
  const [qty, setQty] = useState(1);
  const [unitCost, setUnitCost] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [locationId, setLocationId] = useState(1);
  const [notice, setNotice] = useState("");

  async function lookup(code) {
    const b = (code ?? barcode).trim();
    if (!b) return;
    setNotice("");
    const data = await scanBarcode(b);
    setResolved(data || null);
    if (!data) setNotice("Nessun risultato");
  }

  async function onPurchase() {
    if (!resolved) return;
    const payload = {
      supplier_id: null,
      invoice_number: `WEB-${Date.now()}`,
      total_cost: unitCost ? Number(unitCost) : null,
      items: [
        {
          variant_id: resolved.variant_id,
          quantity: Number(qty || 1),
          unit_cost: unitCost ? Number(unitCost) : null,
          location_id: Number(locationId),
        },
      ],
    };
    const res = await createPurchase(payload);
    setNotice(res.purchase_id ? "Carico registrato" : "Errore carico");
    await lookup();
  }

  async function onSale() {
    if (!resolved) return;
    const payload = {
      channel: "in_store",
      payment_method: "cash",
      total: unitPrice ? Number(unitPrice) : 0,
      items: [
        {
          variant_id: resolved.variant_id,
          quantity: Number(qty || 1),
          unit_price: Number(unitPrice || 0),
          location_id: Number(locationId),
        },
      ],
    };
    const res = await createSale(payload);
    setNotice(res.sale_id ? "Vendita registrata" : "Errore vendita");
    await lookup();
  }

  return (
    <div className="container grid">
      <h1 className="title">Operazioni</h1>
      <div className="card grid">
        <ScanInput
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onScanned={(code) => lookup(code)}
          placeholder="Barcode"
        />
        <div className="row">
          <select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className="input"
          >
            <option value={1}>MAIN</option>
          </select>
        </div>
        <div className="row">
          <input
            className="input"
            type="number"
            placeholder="Quantità"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          <input
            className="input"
            type="number"
            step="0.01"
            placeholder="Costo unitario"
            value={unitCost}
            onChange={(e) => setUnitCost(e.target.value)}
          />
          <input
            className="input"
            type="number"
            step="0.01"
            placeholder="Prezzo unitario"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
          />
        </div>
        <div className="row">
          <button
            className="btn btn-success"
            onClick={onPurchase}
            disabled={!resolved}
          >
            Carica
          </button>
          <button
            className="btn btn-danger"
            onClick={onSale}
            disabled={!resolved}
          >
            Vendi
          </button>
          <button
            className="btn"
            onClick={() => lookup()}
            disabled={!barcode.trim()}
          >
            Aggiorna
          </button>
        </div>
        {notice && <div className="badge">{notice}</div>}
        {resolved && (
          <table className="table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Prodotto</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{resolved.sku}</td>
                <td>{resolved.title}</td>
                <td>{resolved.stock_total}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
