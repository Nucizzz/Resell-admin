import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";

dotenv.config();

const app = express();
app.use(express.json());

const allowed = ["http://localhost:5173", "https://app.nucizzz.shop"];

app.use(
  cors({
    origin: (origin, cb) => cb(null, !origin || allowed.includes(origin)),
    credentials: false,
  })
);

const TOK = process.env.API_TOKEN;

// middleware: richiede Authorization: Bearer <token>
function requireToken(req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token || token !== TOK)
    return res.status(401).json({ error: "unauthorized" });
  next();
}

// login: restituisce il token se credenziali corrette
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    return res.json({ token: TOK });
  }
  return res.status(401).json({ error: "invalid_credentials" });
});

app.get("/api/ping", (req, res) => res.json({ ok: true }));

// proteggi tutte le rotte vere dell’app
app.use("/api", requireToken, routes);

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`API on http://${HOST}:${PORT}`);
});
