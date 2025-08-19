import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/Logo-MiraclePrivateClass.png";
import heroImage from "./assets/asset(1).jpg";
import axios from "axios";

/* ================= Hero Components ================= */
const HeroCard = () => (
  <div className="hero-card">
    <h1>Miracle Private Class</h1>
    <p className="tagline">Dengan Ilmu Meraih Keajaiban</p>
    <ul className="hero-services">
      <li>Privat Akademik</li>
      <li>Bimbingan Ujian</li>
      <li>Persiapan Masuk Sekolah / Universitas</li>
      <li>Bimbingan Tugas & PR</li>
    </ul>
  </div>
);

const HeroImage = ({ src }) => (
  <div className="hero-right">
    <img src={src} alt="Belajar" className="hero-image" />
  </div>
);

/* ================= Program Components ================= */
const CategoryButtons = ({ categories, activeCategory, setActiveCategory }) => (
  <div className="category-buttons">
    {categories.map((cat) => (
      <button
        key={cat}
        className={`category-btn ${activeCategory === cat ? "active" : ""}`}
        onClick={() => setActiveCategory(cat)}
      >
        {cat}
      </button>
    ))}
  </div>
);

const ProgramList = ({ programs }) => {
  const [activeProgramId, setActiveProgramId] = useState(null);

  if (!programs.length) return <p>Tidak ada program pada kategori ini.</p>;

  return (
    <div className="program-grid">
      {programs.map((prog) => {
        const isActive = activeProgramId === prog.id;
        return (
          <div
            key={prog.id}
            className="program-card"
            onClick={() => setActiveProgramId(isActive ? null : prog.id)}
          >
            <h3>{prog.name}</h3>
            <p><strong>Durasi:</strong> {prog.duration}</p>
            <p><strong>Metode:</strong> {prog.method}</p>
            <p><strong>Pertemuan:</strong> {prog.sessions}</p>

            {isActive && (
              <div className="cta-buttons">
                <a
                  className="cta primary"
                  href="https://bit.ly/DaftarSekarang"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Daftar Sekarang
                </a>
                <a
                  className="cta secondary"
                  href={`https://wa.me/6282197150696?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20${encodeURIComponent(prog.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Konsultasi Gratis
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ================= Navbar ================= */
const Navbar = () => {
  const handleLogoClick = () => {
    // Scroll ke atas halaman
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Jika ada state lain di App.js yang menandakan halaman "awal",
    // bisa direset juga di sini lewat props atau context
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <div className="logo-container" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <img src={logo} alt="MiraclePrivateClass" className="logo" />
        </div>
        <h1 className="brand-name">Miracle Private Class</h1>
      </div>
      <ul className="nav-links">
        <li><a href="#programs">Program</a></li>
        <li><a href="#about">Tentang Kami</a></li>
        <li><a href="#testimoni">Testimoni</a></li>
        <li><a href="#kontak">Kontak</a></li>
      </ul>
    </nav>
  );
};

/* ================= Main App ================= */
function App() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Kelas Khusus");

  const categories = ["Kelas Khusus", "Privat Akademik", "Persiapan Ujian"];

  useEffect(() => {
    async function getPrograms() {
      try {
        const response = await axios.get("http://localhost:5000/api/programs");
        setPrograms(response.data);
      } catch (err) {
        console.error("Error fetching programs:", err);
        setError("Gagal memuat program. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    }
    getPrograms();
  }, []);

  const filteredPrograms = programs.filter(p => p.category === activeCategory);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <HeroCard />
          <HeroImage src={heroImage} />
        </div>
        <ul className="highlight-list">
          <li>Pengajar Profesional</li>
          <li>Waktu & Mapel Fleksibel</li>
          <li>Biaya Lebih Terjangkau</li>
        </ul>
      </section>

      {/* Programs Section */}
      <section id="programs" className="programs">
        <div className="container">
          <h2>Program Kami</h2>
          {loading && <p>Sedang memuat program...</p>}
          {error && <p className="error">{error}</p>}

          <CategoryButtons
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <ProgramList programs={filteredPrograms} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>Tentang Kami</h2>
          <p>
            Miracle Private adalah lembaga les privat dengan tutor berpengalaman
            dan metode belajar personal sesuai kebutuhan siswa.
          </p>
        </div>
      </section>
    </>
  );
}

export default App;