// File: index.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const supabase = require("./supabaseClient");

const app = express();
const port = process.env.PORT || 5000;

// ===================== Middleware =====================
const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.1.10:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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

// ===================== Routes for Galeri =====================
app.get("/api/galeri/:type", asyncHandler(async (req, res) => {
  const { type } = req.params; // "foto" atau "video"
  const bucket = type === "foto" ? "galeri-foto" : "galeri-video";

  // Ambil list isi bucket root
  const { data, error } = await supabase.storage.from(bucket).list("", { limit: 100 });

  if (error) return res.status(500).json({ error: error.message });

  // Gunakan path lengkap untuk generate public URL
  const urls = data.map(file => {
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(file.name);
    return publicUrlData.publicUrl; // ambil dari object data
  });

  res.json(urls);
}));

// ===================== Routes for Articles =====================
// Ambil semua artikel
app.get("/api/articles", asyncHandler(async (req, res) => {
  const result = await pool.query("SELECT * FROM articles ORDER BY created_at DESC");
  res.json(result.rows);
}));

// Ambil 1 artikel
app.get("/api/articles/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM articles WHERE id = $1", [id]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Artikel tidak ditemukan." });
  }
  res.json(result.rows[0]);
}));

// Tambah artikel
app.post("/api/articles", asyncHandler(async (req, res) => {
  const { title, content, image_url } = req.body;
  const result = await pool.query(
    "INSERT INTO articles (title, content, image_url) VALUES ($1, $2, $3) RETURNING *",
    [title, content, image_url]
  );
  res.status(201).json(result.rows[0]);
}));

// Update artikel
app.put("/api/articles/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, image_url } = req.body;
  const result = await pool.query(
    "UPDATE articles SET title=$1, content=$2, image_url=$3 WHERE id=$4 RETURNING *",
    [title, content, image_url, id]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Artikel tidak ditemukan." });
  }
  res.json(result.rows[0]);
}));

// Hapus artikel
app.delete("/api/articles/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM articles WHERE id=$1 RETURNING *", [id]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Artikel tidak ditemukan." });
  }
  res.json({ message: "✅ Artikel berhasil dihapus." });
}));

// ===================== Start Server =====================
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://192.168.1.10:${port}`);
});