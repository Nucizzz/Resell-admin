import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";

dotenv.config();

const app = express();

// disattiva ETag
app.set("etag", false);

// versione visibile negli header (debug)
const BUILD = "v8-" + new Date().toISOString();
console.log("🔧 Starting API", BUILD, "cwd=", process.cwd());

app.use(express.json());

// CORS aperto
app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);
app.options("*", cors());

// header su tutte le risposte
app.use((req, res, next) => {
  res.set("X-Debug-Server", BUILD);
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");
  res.set("Vary", "Origin");
  next();
});

// auth semplice (se la usi)
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "admin";
const API_TOKEN = process.env.API_TOKEN || "api_live_localtoken";

function requireToken(req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token || token !== API_TOKEN)
    return res.status(401).json({ error: "unauthorized" });
  next();
}

// pubblici
app.get("/api/ping", (req, res) =>
  res.status(200).json({ ok: true, t: Date.now() })
);
app.get("/api/debug/info", (req, res) =>
  res.json({ ok: true, cwd: process.cwd(), build: BUILD })
);

// protetti
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USER && password === ADMIN_PASS)
    return res.json({ token: API_TOKEN });
  return res.status(401).json({ error: "invalid_credentials" });
});
app.use("/api", requireToken, routes);

const PORT = Number(process.env.PORT || 4000);
const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`✅ API on http://${HOST}:${PORT} (${BUILD})`);
});
