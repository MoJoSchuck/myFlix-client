import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export const MovieCarousel = ({ movies }) => {
  return (
    <Carousel>
      {movies.map((movie) => (
        <Carousel.Item key={movie._id}>
          <img
            className="d-block w-100"
            src={movie.ImagePath}
            alt={movie.Title}
          />
          <Carousel.Caption>
            <h3>{movie.Title}</h3>
            <p>{movie.Description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

