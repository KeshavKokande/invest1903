import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import NewsCard from './NewsCard';

const NewsCarousel = ({ news }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={responsive}>
      {news.map((article, index) => (
        <div key={index}>
          <center><NewsCard
            imageUrl={article.urlToImage}
            source={article.source.name}
            title={article.title}
            onClick={() => window.open(article.url, '_blank')}
          /></center>
        </div>
      ))}
    </Carousel>
  );
};

export default NewsCarousel;
