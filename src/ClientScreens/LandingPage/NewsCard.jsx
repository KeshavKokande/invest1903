import React from 'react';
import PropTypes from 'prop-types';

const NewsCard = ({ imageUrl, source, title, onClick }) => {
  return (
    <div className="news-card" >
      
        <span className="source">{source}</span>
        <h3>{title}</h3>
        <button onClick={onClick}>Read More</button>
      </div>

  );
};

NewsCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NewsCard;
