import React, { useState } from "react";
import { createProduct } from "../api";
import ScanInput from "../components/ScanInput";

export default function NewProduct() {
  const [p, setP] = useState({
    title: "",
    brand_id: null,
    category_id: null,
    gender: "U",
    item_condition: "used_grade_a",
    variant: {
      sku: "",
      color: "",
      size: "",
      price: "",
      cost: "",
      status: "active",
    },
    barcode: "",
    media_url: "",
  });
  const [notice, setNotice] = useState("");

  async function onCreate() {
    const res = await createProduct(p);
    setNotice(res.product_id ? "Prodotto creato" : "Errore");
  }

  return (
    <div className="container grid">
      <h1 className="title">Nuovo Prodotto</h1>
      <div className="card grid">
        <div className="row">
          <input
            className="input"
            placeholder="Titolo"
            value={p.title}
            onChange={(e) => setP({ ...p, title: e.target.value })}
          />
        </div>
        <div className="row">
          <input
            className="input"
            type="number"
            placeholder="Brand ID"
            value={p.brand_id || ""}
            onChange={(e) =>
              setP({
                ...p,
                brand_id: e.target.value ? Number(e.target.value) : null,
              })
            }
          />
          <input
            className="input"
            type="number"
            placeholder="Category ID"
            value={p.category_id || ""}
            onChange={(e) =>
              setP({
                ...p,
                category_id: e.target.value ? Number(e.target.value) : null,
              })
            }
          />
          <select
            className="input"
            value={p.gender}
            onChange={(e) => setP({ ...p, gender: e.target.value })}
          >
            <option value="U">U</option>
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
          <select
            className="input"
            value={p.item_condition}
            onChange={(e) => setP({ ...p, item_condition: e.target.value })}
          >
            <option value="new">new</option>
            <option value="new_with_defect">new_with_defect</option>
            <option value="used_grade_a">used_grade_a</option>
            <option value="used_grade_b">used_grade_b</option>
            <option value="used_grade_c">used_grade_c</option>
          </select>
        </div>
        <div className="row">
          <input
            className="input"
            placeholder="SKU"
            value={p.variant.sku}
            onChange={(e) =>
              setP({ ...p, variant: { ...p.variant, sku: e.target.value } })
            }
          />
          <input
            className="input"
            placeholder="Colore"
            value={p.variant.color}
            onChange={(e) =>
              setP({ ...p, variant: { ...p.variant, color: e.target.value } })
            }
          />
          <input
            className="input"
            placeholder="Taglia"
            value={p.variant.size}
            onChange={(e) =>
              setP({ ...p, variant: { ...p.variant, size: e.target.value } })
            }
          />
        </div>
        <div className="grid">
          <ScanInput
            value={p.barcode}
            onChange={(e) => setP({ ...p, barcode: e.target.value })}
            onScanned={(code) => setP((prev) => ({ ...prev, barcode: code }))}
            placeholder="Barcode"
          />
        </div>
        <div className="row">
          <input
            className="input"
            placeholder="Media URL"
            value={p.media_url}
            onChange={(e) => setP({ ...p, media_url: e.target.value })}
          />
        </div>
        <div className="row">
          <button className="btn btn-primary" onClick={onCreate}>
            Crea
          </button>
          {notice && <div className="badge">{notice}</div>}
        </div>
      </div>
    </div>
  );
}
