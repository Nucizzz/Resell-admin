import React, { useEffect, useMemo, useState } from "react";
import { getPing } from "../api";

export default function Dashboard() {
  const [ping, setPing] = useState(null);
  const [locationId] = useState(1);

  useEffect(() => {
    getPing().then(setPing);
  }, []);
  const kpis = useMemo(
    () => [
      { label: "API", value: ping && ping.ok ? "Online" : "Offline" },
      { label: "Sede", value: locationId },
      { label: "App", value: "Web" },
    ],
    [ping, locationId]
  );

  return (
    <div className="container grid">
      <h1 className="title">Dashboard</h1>
      <p className="subtitle">Stato sistema e sede corrente</p>
      <div className="kpi">
        {kpis.map((k, i) => (
          <div
            key={i}
            className="card"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>{k.label}</div>
            <div className="badge">{k.value + ""}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
