import React, { useState, useEffect, memo } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";
import logo from "./assets/Logo-MiraclePrivateClass.png";
import heroImage from "./assets/asset(1).jpg";
import fotoFitri from "./assets/testimoni-1.jpg";
import { supabase } from "./supabaseClient";

// Components
import ArticleDetail from "./components/Articles/ArticleDetail.jsx";

/* ================= Hero Section Components ================= */
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

/* ================= Programs Section Components ================= */
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
                  href={`https://wa.me/6285796452485?text=${encodeURIComponent(
                    "Halo, Perkenalkan saya [Nama Anda]. Saya tertarik untuk memesan kelas privat, Mohon Informasinya ?"
                  )}`}
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

/* ================= Navbar & Footer ================= */
const Navbar = memo(() => {
  const navigate = useNavigate();

  const handleNavClick = (hash) => {
    // Pindah ke home
    navigate("/");

    // Scroll ke section setelah home selesai render
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <div className="logo-container" onClick={handleLogoClick}>
          <img src={logo} alt="MiraclePrivateClass" className="logo" />
        </div>
        <h1 className="brand-name">Miracle Private Class</h1>
      </div>
      <ul className="nav-links">
        <li><button className="nav-btn" onClick={() => handleNavClick("#programs")}>Program</button></li>
        <li><button className="nav-btn" onClick={() => handleNavClick("#galeri")}>Galeri</button></li>
        <li><button className="nav-btn" onClick={() => handleNavClick("#artikel")}>Artikel</button></li>
      </ul>
    </nav>
  );
});

const Footer = memo(() => (
  <footer className="footer">
    {/* Footer content sama seperti sebelumnya */}
  </footer>
));

/* ================= Axios Instance ================= */
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
});

/* ================= Main App Component ================= */
function App() {
  const [programs, setPrograms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Kelas Khusus");
  const [fotoUrls, setFotoUrls] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [articles, setArticles] = useState([]);

  const filteredPrograms = programs.filter(p => p.category === activeCategory);
  const categories = ["Kelas Khusus", "Privat Akademik", "Persiapan Ujian"];

  /* -------------------- Fetch Data -------------------- */
  useEffect(() => {
    async function getPrograms() {
      try {
        const response = await axiosInstance.get("/programs");
        setPrograms(response.data);
      } catch (err) {
        console.error(err);
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
        const response = await axiosInstance.get("/teachers");
        setTeachers(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    getTeachers();
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const fotoRes = await axiosInstance.get("/galeri/foto");
        const videoRes = await axiosInstance.get("/galeri/video");
        setFotoUrls(fotoRes.data);
        setVideoUrls(videoRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGallery();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axiosInstance.get("/articles");
        setArticles(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticles();
  }, []);

  /* -------------------- Main Router -------------------- */
  return (
    <>
      <Navbar />

      <Routes>
        {/* Halaman utama */}
        <Route
          path="/"
          element={
            <>
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

              {/* Programs */}
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

              {/* Testimoni + About */}
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

              {/* Galeri */}
              <section id="galeri" className="gallery-section">
                <div className="gallery-container">
                  <h2 className="gallery-title">Galeri</h2>

                  <div className="gallery-flex">
                    {/* Foto */}
                    <div className="gallery-column">
                      <h3 className="gallery-subtitle">📸 Foto</h3>
                      <div className="gallery-grid">
                        {fotoUrls.map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            alt={`Foto ${i}`}
                            className="gallery-image"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Video */}
                    <div className="gallery-column">
                      <h3 className="gallery-subtitle">🎥 Video</h3>
                      <div className="gallery-grid">
                        {videoUrls.map((url, i) => (
                          <video
                            key={i}
                            src={url}
                            controls
                            className="gallery-video"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Teachers */}
              <section id="teachers" className="teachers">
                {/* ...teachers content sama seperti sebelumnya... */}
              </section>

              {/* Artikel */}
              <section id="artikel" className="article-section">
                <div className="article-container">
                  <h2 className="article-title">Baca Artikel &gt;&gt;&gt;</h2>
                  <div className="article-grid">
                    {articles.map((article) => (
                      <Link
                        key={article.id}
                        to={`/artikel/${article.id}`}
                        className="article-card"
                        style={{ backgroundImage: `url(${article.image_url})` }}
                      >
                        <div className="article-card-overlay">
                          <h3 className="article-card-title">{article.title}</h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            </>
          }
        />

        {/* Halaman detail artikel */}
        <Route path="/artikel/:id" element={<ArticleDetail />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
