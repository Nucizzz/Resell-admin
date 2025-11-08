import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    const res = await login(u, p);
    if (res.token) {
      localStorage.setItem("token", res.token);
      nav("/");
    } else {
      setErr("Credenziali non valide");
    }
  }

  return (
    <div className="container grid" style={{ maxWidth: 420 }}>
      <h1 className="title">Login</h1>
      <form className="card grid" onSubmit={onSubmit}>
        <input
          className="input"
          placeholder="Utente"
          value={u}
          onChange={(e) => setU(e.target.value)}
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={p}
          onChange={(e) => setP(e.target.value)}
        />
        {err && <div className="badge">{err}</div>}
        <button className="btn btn-primary" type="submit">
          Entra
        </button>
      </form>
    </div>
  );
}
