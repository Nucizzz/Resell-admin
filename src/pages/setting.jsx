import React, { useState } from "react";
import { API_BASE, API_BASE_FALLBACKS } from "../api";

export default function Settings() {
  const [locationId, setLocationId] = useState(1);
  return (
    <div className="container grid">
      <h1 className="title">Impostazioni</h1>
      <div className="card grid">
        <div className="row">
          <select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className="input"
          >
            <option value={1}>MAIN</option>
          </select>
        </div>
        <div className="badge">{API_BASE}</div>
        {API_BASE_FALLBACKS.length > 0 && (
          <div className="badge badge--muted">
            fallback: {API_BASE_FALLBACKS.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}
