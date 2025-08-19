import React, { useState, useEffect, memo } from "react";
import "./App.css"; // Mengimpor file CSS yang telah digabungkan
import logo from "./assets/Logo-MiraclePrivateClass.png";
import heroImage from "./assets/asset(1).jpg";
import fotoFitri from "./assets/testimoni-1.jpg";
import axios from "axios";

/* =========================== Component Definitions ========================== */

// Hero section components
const HeroCard = memo(() => (
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
));

const HeroImage = memo(({ src }) => (
  <div className="hero-right">
    <img src={src} alt="Belajar" className="hero-image" />
  </div>
));

// Programs section components
const CategoryButtons = memo(({ categories, activeCategory, setActiveCategory }) => (
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
));

const ProgramList = memo(({ programs }) => {
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
});

// Main Navbar component
const Navbar = memo(() => {
  const handleLogoClick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  
  return (
    <nav className="nav">
      <div className="nav-left">
        <div className="logo-container" onClick={handleLogoClick}>
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
});

// Main Footer component
const Footer = memo(() => (
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
      <div className="footer-social">
        <h4>Media Sosial</h4>
        <div className="social-links">
          <a href="https://www.facebook.com/share/1CbyFR8Upf/" target="_blank" rel="noopener noreferrer">🌐 Facebook</a>
          <a href="https://www.instagram.com/miracleprivate.class?igsh=N2o2eWcxZWI5Z2Q0" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
          <a href="https://wa.me/6285796452485" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
        </div>
      </div>
      <div className="footer-right">
        <h4>Kontak</h4>
        <p>📍 Kota Palu, Sulawesi Tengah</p>
        <p>📞 <a href="tel:+6285796452485">+62 857-9645-2485</a></p>
        <p>✉️ <a href="mailto:miracleprivate99@gmail.com">miracleprivate99@gmail.com</a></p>
        <div className="footer-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6387.384708984464!2d119.874879776936!3d-0.891702099999991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d8bf9b2a8a6d44d%3A0x4a52f64a9f1c0a2d!2sMiracle%20Private%20Class!5e0!3m2!1sid!2sid!4v1708333333333!5m2!1sid!2sid"
            width="100%"
            height="180"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Miracle Private Class"
          ></iframe>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2025 Miracle Private Class. All Rights Reserved.</p>
    </div>
  </footer>
));

/* =============================== Main App Component =============================== */
function App() {
  const [programs, setPrograms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Kelas Khusus");

  const categories = ["Kelas Khusus", "Privat Akademik", "Persiapan Ujian"];

  useEffect(() => {
    async function getPrograms() {
      try {
        const response = await axios.get("http://192.168.1.10:5000/api/programs");
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

  useEffect(() => {
    async function getTeachers() {
      try {
        const response = await axios.get("http://192.168.1.10:5000/api/teachers");
        setTeachers(response.data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    }
    getTeachers();
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
          <li>Pengajar Berpengalaman</li>
          <li>Metode Belajar Personal</li>
          <li>Jadwal Fleksibel</li>
          <li>Harga Terjangkau</li>
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

      {/* Testimoni + About Section (Side by Side) */}
      <div id="testimoni-anchor" style={{ position: "absolute", top: "-72px" }}></div>
      <section className="testimoni-about">
        <div className="container">
          <div className="testimoni-about-wrapper">
            <div id="testimoni" className="testimoni">
              <h2>Testimoni</h2>
              <div className="testimoni-list">
                <div className="testimoni-item">
                  <img src={fotoFitri} alt="Foto Ibu Fitri" className="testimoni-img" />
                  <div className="testimoni-text">
                    <p>
                      "Alhamdulillah selama bergabung di <strong>Miracle Private Class</strong> merasa 
                      terbantu untuk memperlancar bacaan ananda dan klu pas kembar ada tgs ada mbak gurux bantu kawal nyong🙏 
                      jadi umma pe tensi aman2😂"
                    </p>
                    <span>- Ibu Fitri (Wali Murid)</span>
                  </div>
                </div>
              </div>
            </div>

            <div id="about" className="about">
              <h2>Tentang Kami</h2>
              <p>Miracle Private adalah lembaga les privat dengan tutor berpengalaman...</p>
              <h3>Visi & Misi</h3>
              <ul>
                <li>Memberikan layanan pendidikan yang berkualitas</li>
                <li>Membantu siswa mencapai prestasi maksimal</li>
                <li>Menciptakan pengalaman belajar yang menyenangkan</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section id="teachers" className="teachers">
        <div className="container">
          <h2>Tim Pengajar</h2>
          <div className="teachers-list">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="teacher-card">
                <img src={teacher.photo_url} alt={teacher.name} />
                <h3>{teacher.name}</h3>
                <p>{teacher.subject}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;