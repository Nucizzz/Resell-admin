import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";

export default function Scanner({ onDetected }) {
  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState("");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [last, setLast] = useState("");

  // Prepara gli "hints" per dire allo scanner quali formati leggere
  const hints = useRef(null);
  if (!hints.current) {
    const h = new Map();
    h.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.CODE_128,
      BarcodeFormat.CODE_39,
      BarcodeFormat.ITF,
    ]);
    h.set(DecodeHintType.TRY_HARDER, true);
    hints.current = h;
  }

  useEffect(() => {
    async function init() {
      try {
        // Chiede permesso per poter leggere le etichette delle camere
        await navigator.mediaDevices.getUserMedia({ video: true });
        const list = await BrowserMultiFormatReader.listVideoInputDevices();
        setDevices(list || []);
        if (list && list.length > 0) {
          const back = list.find((d) => /back|rear|environment/i.test(d.label));
          setDeviceId(back ? back.deviceId : list[0].deviceId);
        } else {
          setError("Nessuna fotocamera trovata");
        }
      } catch {
        setError("Permesso fotocamera negato o non disponibile");
      }
    }
    init();
    return () => stopScan();
  }, []);

  async function startScan() {
    if (!deviceId || running) return;
    setError("");
    readerRef.current = new BrowserMultiFormatReader(hints.current);
    try {
      // Forziamo una risoluzione decente per aiutare la messa a fuoco
      const constraints = {
        video: {
          deviceId: { exact: deviceId },
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        },
      };
      await readerRef.current.decodeFromConstraints(
        constraints,
        videoRef.current,
        (result, err, controls) => {
          if (result) {
            const text = result.getText();
            setLast(text);
            if (onDetected) onDetected(text);
            // Fermiamo e riavviamo dopo mezzo secondo per evitare duplicati
            controls.stop();
            setRunning(false);
            setTimeout(() => startScan(), 500);
          }
        }
      );
      setRunning(true);
    } catch {
      setError("Impossibile avviare lo scanner");
      setRunning(false);
    }
  }

  function stopScan() {
    try {
      if (readerRef.current) readerRef.current.reset();
    } catch {}
    setRunning(false);
  }

  return (
    <div className="grid">
      <div className="row">
        <select
          className="input"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
        >
          {devices.map((d) => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label || d.deviceId}
            </option>
          ))}
        </select>
        {!running ? (
          <button className="btn btn-primary" type="button" onClick={startScan}>
            Avvia scanner
          </button>
        ) : (
          <button className="btn btn-danger" type="button" onClick={stopScan}>
            Stop
          </button>
        )}
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            background: "#000",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <video
            ref={videoRef}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted
            playsInline
          ></video>
        </div>
        {error && <div className="badge">{error}</div>}
        {!error && !running && (
          <div className="badge">
            Suggerimento: luce forte, riempi l’inquadratura ~70%, tieni a 15–25
            cm.
          </div>
        )}
        {!!last && <div className="badge">Ultimo rilevato: {last}</div>}
      </div>
    </div>
  );
}
