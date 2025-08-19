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

    {/* Highlight Layanan Utama */}
    <ul className="hero-services">
      <li>Privat Akademik</li>
      <li>Bimbingan Ujian</li>
      <li>Persiapan Masuk Sekolah / Universitas</li>
      <li>Bimbingan Tugas & PR</li>
    </ul>

    {/* CTA Buttons */}
    <div className="cta-buttons">
      <a href="#kontak" className="cta primary">Daftar Sekarang</a>
      <a href="#konsultasi" className="cta secondary">Konsultasi Gratis</a>
    </div>
  </div>
);

const HeroImage = ({ src }) => (
  <div className="hero-right">
    <img src={src} alt="Belajar" className="hero-image" />
  </div>
);

/* ================= Program Component ================= */
const ProgramSection = ({ programs }) => {
  // Group programs berdasarkan kategori
  const groupedPrograms = programs.reduce((acc, program) => {
    if (!acc[program.category]) acc[program.category] = [];
    acc[program.category].push(program);
    return acc;
  }, {});

  return (
    <>
      {Object.keys(groupedPrograms).map(category => (
        <div key={category} className="program-category">
          <h3>{category}</h3>
          <div className="program-grid">
            {groupedPrograms[category].map(program => (
              <div key={program.id} className="program-card">
                <h4>{program.name}</h4>
                <p>Durasi: {program.duration}</p>
                <p>Metode: {program.method}</p>
                <p>Pertemuan: {program.sessions}</p>
                {program.price && <p>Harga: Rp{program.price.toLocaleString()}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

/* ================= Navbar Component ================= */
const Navbar = () => (
  <nav className="nav">
    <div className="nav-left">
      <div className="logo-container">
        <img src={logo} alt="MiraclePrivateClass" className="logo" />
      </div>
      <h1 className="brand-name">Miracle Private Class</h1>
    </div>
    <ul className="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#programs">Program</a></li>
      <li><a href="#about">Tentang Kami</a></li>
      <li><a href="#testimoni">Testimoni</a></li>
      <li><a href="#kontak">Kontak</a></li>
    </ul>
  </nav>
);

/* ================= Main App ================= */
function App() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <HeroCard />
          <HeroImage src={heroImage} />
        </div>

        {/* Highlight Keunggulan */}
        <ul className="highlight-list">
          <li>Pengajar Profesional</li>
          <li>Waktu & Mapel Fleksibel</li>
          <li>Biaya Lebih Terjangkau</li>
        </ul>
      </section>

{/* Program Section */}
<section id="programs" className="programs">
  <div className="container">
    <h2>Program Kami</h2>
    {loading && <p>Sedang memuat program...</p>}
    {error && <p className="error">{error}</p>}

    {!loading && !error && <ProgramSection programs={programs} />}
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