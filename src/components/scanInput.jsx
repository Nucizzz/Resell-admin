import React, { useCallback, useState } from "react";
import Scanner from "./scanner";

export default function ScanInput({
  value,
  onChange,
  onScanned,
  placeholder = "Barcode",
}) {
  const [open, setOpen] = useState(false);
  const handleDetected = useCallback(
    (code) => {
      onChange({ target: { value: code } });
      if (onScanned) onScanned(code);
      setOpen(false);
    },
    [onChange, onScanned]
  );
  return (
    <div className="grid">
      <div className="row">
        <input
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Chiudi" : "Scanner"}
        </button>
      </div>
      {open && <Scanner onDetected={handleDetected} />}
    </div>
  );
}
