import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/Logo-MiraclePrivateClass.png";
import logoMPC from "./assets/Logo-MPC.jpg";
import heroImage from "./assets/asset(1).jpg";
import fotoFitri from "./assets/testimoni-1.jpg";
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
            <p><strong>Pertemuan:</strong> {prog.duration}</p>
            <p><strong>Metode:</strong> {prog.method}</p>
            <p><strong>Durasi:</strong> {prog.sessions}</p>

            {isActive && (
              <div className="cta-buttons">
                <a
                  className="cta primary"
                  href="https://forms.gle/n9QXeFyKGkzcQgaz7"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Daftar Sekarang
                </a>
                <a
                  className="cta secondary"
                  href={`https://wa.me/6285796452485?text=${encodeURIComponent("Halo, Perkenalkan saya [Nama Anda]. Saya tertarik untuk memesan kelas privat, Mohon Informasinya ?")}`}
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
        <li><a href="#testimoni">Testimoni</a></li>
        <li><a href="#about">Tentang Kami</a></li>
        <li><a href="#kontak">Kontak</a></li>
      </ul>
    </nav>
  );
};

/* ================= Footer ================= */

const Footer = () => (
<footer className="footer">
  <div className="footer-content">
    <div className="footer-left">
      <div className="footer-logo-container">
        <img src={logo} alt="Miracle Private Class" className="footer-logo" />
      </div>
      <h3 className="footer-brand">Miracle Private Class</h3>
      <p className="footer-tagline">Dengan Ilmu Meraih Keajaiban</p>
    </div>

    <div className="footer-middle">
      <h4>Menu</h4>
      <ul>
        <li><a href="#programs">Program</a></li>
        <li><a href="#testimoni">Testimoni</a></li>
        <li><a href="#about">Tentang Kami</a></li>
        <li><a href="#kontak">Kontak</a></li>
      </ul>
    </div>

    <div className="footer-right">
      <h4>Kontak</h4>
      <p>📍 Kota Palu Sulawesi Tengah</p>
      <p>📞 <a href="tel:+6285796452485">+62 857-9645-2485</a></p>
      <p>✉️ <a href="mailto:miracleprivate99@gmail.com">miracleprivate99@gmail.com</a></p>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© 2025 Miracle Private Class. All Rights Reserved.</p>
  </div>
</footer>
);


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
          <h2>Program</h2>
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

      {/* Testimoni Section */}
    <section id="testimoni" className="testimoni">
      <div className="container">
        <h2>Kata Mereka</h2>
        <div className="testimoni-list">
          <div className="testimoni-item">
            <img src={fotoFitri} alt="Foto Ibu Fitri" className="testimoni-img" />
            <div className="testimoni-text">
              <p>
                "Alhamdulillah selama bergabung di <strong>Miracle Private Class</strong> merasa terbantu untuk memperlancar bacaan 
                ananda dan klu pas kembar ada tgs ada mbak gurux bantu kawal nyong🙏 jadi umma pe tensi aman2😂"
              </p>
              <span>
                - Ibu Fitri (Wali Murid) / Hasan & Husein (Privat Calistung)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>Tentang Kami</h2>
          <p>
            Miracle Private adalah lembaga les privat dengan tutor berpengalaman
            dan metode belajar personal sesuai kebutuhan siswa.
          </p>
        </div>
      </section>   {/* ✅ ditutup dengan benar */}

      {/* Footer */}
      <Footer />
    </>
  );
}
export default App;