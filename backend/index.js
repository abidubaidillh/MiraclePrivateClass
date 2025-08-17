const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route Utama
app.get("/", (req, res) => {
  res.send("Miracle Private API berjalan!!");
});

// Contoh ambil semua program
app.get("/api/programs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM programs");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route test koneksi
app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, serverTime: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});