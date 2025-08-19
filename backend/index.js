// File: index.js

const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// ===================== Middleware =====================
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// ===================== Helper Functions =====================
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error(`❌ Error in handler for ${req.path}:`, err.message);
    res.status(500).json({ error: "Terjadi kesalahan server." });
  });
};

// ===================== Main Route =====================
app.get("/", (req, res) => {
  res.send("✅ Miracle Private API berjalan!!");
});

app.get("/api/test", asyncHandler(async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json({ success: true, serverTime: result.rows[0].now });
}));

// ===================== Routes for Programs =====================
// Ambil semua program
app.get("/api/programs", asyncHandler(async (req, res) => {
  const result = await pool.query("SELECT * FROM programs ORDER BY id ASC");
  res.json(result.rows);
}));

// Ambil 1 program berdasarkan ID
app.get("/api/programs/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM programs WHERE id = $1", [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Program tidak ditemukan." });
  }

  res.json(result.rows[0]);
}));

// Tambah program baru
app.post("/api/programs", asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const result = await pool.query(
    "INSERT INTO programs (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  res.status(201).json(result.rows[0]);
}));

// Update program
app.put("/api/programs/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const result = await pool.query(
    "UPDATE programs SET name=$1, description=$2 WHERE id=$3 RETURNING *",
    [name, description, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Program tidak ditemukan." });
  }

  res.json(result.rows[0]);
}));

// Hapus program
app.delete("/api/programs/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM programs WHERE id=$1 RETURNING *", [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Program tidak ditemukan." });
  }

  res.json({ message: "✅ Program berhasil dihapus." });
}));

// ===================== Routes for Teachers =====================
// Ambil semua pengajar
app.get("/api/teachers", asyncHandler(async (req, res) => {
  const result = await pool.query("SELECT * FROM teachers ORDER BY id ASC");
  res.json(result.rows);
}));

// Tambah pengajar baru
app.post("/api/teachers", asyncHandler(async (req, res) => {
  const { name, subject, photo_url } = req.body;
  const result = await pool.query(
    "INSERT INTO teachers (name, subject, photo_url) VALUES ($1, $2, $3) RETURNING *",
    [name, subject, photo_url]
  );
  res.status(201).json(result.rows[0]);
}));

// ===================== Start Server =====================
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://192.168.1.10:${port}`);
});