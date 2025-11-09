import React, { useState } from "react";
import { API_BASE } from "../api";

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
      </div>
    </div>
  );
}
