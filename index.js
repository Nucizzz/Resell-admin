import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = new Set(
  [
    "http://localhost:5173",
    "https://nucizzz.shop",
    "https://app.nucizzz.shop",
    process.env.FRONTEND_ORIGIN || "",
  ].filter(Boolean)
);

app.use(cors({ origin: true, credentials: false }));

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

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ token: API_TOKEN });
  }
  return res.status(401).json({ error: "invalid_credentials" });
});

app.get("/api/ping", (req, res) => res.json({ ok: true }));

app.use("/api", requireToken, routes);

const PORT = Number(process.env.PORT || 4000);
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`API on http://${HOST}:${PORT}`);
});
