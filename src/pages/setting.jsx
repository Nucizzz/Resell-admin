import React, { useState } from "react";

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
        <div className="badge">{import.meta.env.VITE_API_BASE}</div>
      </div>
    </div>
  );
}
