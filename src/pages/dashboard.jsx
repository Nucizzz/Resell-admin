import React, { useEffect, useMemo, useState } from "react";
import { getPing } from "../api";

import React, { useEffect, useMemo, useState } from "react";
import { getPing } from "../api";

export default function Dashboard() {
  const [ping, setPing] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getPing();
      setPing(res);
      if (!res?.ok) setErr(JSON.stringify(res));
    })();
  }, []);

  const kpis = useMemo(
    () => [
      { label: "API", value: ping && ping.ok ? "Online" : "Offline" },
      { label: "Dettagli", value: err || "OK" },
    ],
    [ping, err]
  );

  return (
    <div className="container grid">
      <h1 className="title">Dashboard</h1>
      <div className="kpi">
        {kpis.map((k, i) => (
          <div
            key={i}
            className="card"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>{k.label}</div>
            <div
              className="badge"
              style={{
                maxWidth: 420,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {k.value + ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
