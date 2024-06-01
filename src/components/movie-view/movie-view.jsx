import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, findSimilarMovies, onFavorite }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);

    if (!movie) return <div>Movie not found</div>;

    const similarMovies = findSimilarMovies(movie);

    return (
        <>
            <Card className="movie-view">
                <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>
                        <strong>Year:</strong> {movie.ReleaseYear}<br />
                        <strong>Genre:</strong> {movie.Genre.Name}<br />
                        <strong>Director:</strong> {movie.Director.Name}<br />
                        <strong>Description:</strong> {movie.Description}
                    </Card.Text>
                    <Link to={`/`}>
                        <Button variant="light">Back</Button>
                        <Button variant="outline-primary" onClick={() => onFavorite(movie)}>Favorite</Button>
                    </Link>
                </Card.Body>
            </Card>
            <h3 className="mt-5">Similar Movies</h3>
            <Row>
                {similarMovies.map((similarMovie) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={similarMovie._id} className="movie-card-container mb-5">
                        <MovieCard movie={similarMovie} onFavorite={onFavorite} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

MovieView.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            Title: PropTypes.string.isRequired,
            ImagePath: PropTypes.string.isRequired,
            Director: PropTypes.shape({
                Name: PropTypes.string.isRequired,
            }).isRequired,
            Genre: PropTypes.shape({
                Name: PropTypes.string.isRequired,
            }).isRequired,
            ReleaseYear: PropTypes.number.isRequired,
            Description: PropTypes.string.isRequired
        })
    ).isRequired,
    findSimilarMovies: PropTypes.func.isRequired,
    onFavorite: PropTypes.func.isRequired,
};
