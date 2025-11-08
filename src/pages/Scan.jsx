import React, { useState } from "react";
import ScanInput from "../components/scanInput";
import { scanBarcode } from "../api";

export default function Scan() {
  const [barcode, setBarcode] = useState("");
  const [resolved, setResolved] = useState(null);
  const [notice, setNotice] = useState("");

  async function doLookup(code) {
    const b = (code ?? barcode).trim();
    if (!b) return;
    setNotice("");
    const data = await scanBarcode(b);
    setResolved(data || null);
    if (!data) setNotice("Nessun risultato");
  }

  return (
    <div className="container grid">
      <h1 className="title">Scansione</h1>
      <div className="card grid">
        <ScanInput
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onScanned={doLookup}
          placeholder="Barcode"
        />
        <div className="row">
          <button
            className="btn btn-primary"
            onClick={() => doLookup()}
            disabled={!barcode.trim()}
          >
            Cerca
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
