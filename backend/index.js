const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // ganti dengan domain frontend kamu
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// Route Utama
app.get("/", (req, res) => {
  res.send("✅ Miracle Private API berjalan!!");
});

// ================== ROUTES PROGRAM ================== //

// Ambil semua program
app.get("/api/programs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM programs ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching programs:", err.message);
    res.status(500).json({ error: "Terjadi kesalahan server." });
  }
});

// Ambil 1 program berdasarkan ID
app.get("/api/programs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM programs WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Program tidak ditemukan." });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error fetching program by id:", err.message);
    res.status(500).json({ error: "Terjadi kesalahan server." });
  }
});

// Tambah program baru
app.post("/api/programs", async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await pool.query(
      "INSERT INTO programs (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error adding program:", err.message);
    res.status(500).json({ error: "Gagal menambahkan program." });
  }
});

// Update program
app.put("/api/programs/:id", async (req, res) => {
  try {
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
  } catch (err) {
    console.error("❌ Error updating program:", err.message);
    res.status(500).json({ error: "Gagal memperbarui program." });
  }
});

// Hapus program
app.delete("/api/programs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM programs WHERE id=$1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Program tidak ditemukan." });
    }

    res.json({ message: "✅ Program berhasil dihapus." });
  } catch (err) {
    console.error("❌ Error deleting program:", err.message);
    res.status(500).json({ error: "Gagal menghapus program." });
  }
});

// ================== TEST DB ================== //
app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, serverTime: result.rows[0].now });
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    res.status(500).json({ error: "Gagal terhubung ke database." });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});