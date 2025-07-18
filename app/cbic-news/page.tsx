// app/cbic-news/page.tsx
"use client";

import { useEffect, useState } from "react";

interface NewsItem {
  title: string;
  link: string;
}

export default function CbicNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/cbic-news");
        const data = await res.json();
        setNews(data.news);
      } catch (err) {
        console.error("Failed to fetch CBIC news", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CBIC News Updates</h1>
      {loading ? (
        <p>Loading...</p>
      ) : news.length === 0 ? (
        <p>No news available.</p>
      ) : (
        <ul className="space-y-2">
          {news.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
