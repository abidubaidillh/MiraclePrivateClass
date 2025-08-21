// frontend/src/components/ArticleDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Article.css";

const ArticleDetail = () => {
  const { id } = useParams(); // ambil id dari route
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/articles/${id}`);
        if (!res.ok) throw new Error("Artikel tidak ditemukan");
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p className="article-loading">Loading...</p>;
  if (!article) return <p className="article-error">Artikel tidak ditemukan.</p>;

  return (
    <section className="article-detail-section">
      <div className="article-detail-container">
        <h1 className="article-detail-title">{article.title}</h1>
        {article.image_url && (
          <div
            className="article-detail-image"
            style={{ backgroundImage: `url(${article.image_url})` }}
          ></div>
        )}
        <p className="article-detail-date">
          {new Date(article.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <div className="article-detail-content">{article.content}</div>
      </div>
    </section>
  );
};

export default ArticleDetail;