
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed in your project
import NewsCarousel from './NewsCarousel';
import "./LandingPage.css";

const apiKey = 'd8252cced4694cf59ef6f19e2e2a81e2';

const LandingPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${apiKey}`
        );
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="app">
      <h1>Top Business News</h1>
      {news.length > 0 && <NewsCarousel news={news} />}
    </div>
  );
};

export default LandingPage;
