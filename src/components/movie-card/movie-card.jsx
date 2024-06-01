import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick = () => {}, onFavorite }) => {
    return (
        <Card className='movie-card h-100'>
            <div className="ratio ratio-16x9">
                <Card.Img variant="top" src={movie.ImagePath} />
            </div>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="light" onClick={() => onMovieClick(movie)}>Open</Button>
                </Link>
                
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func,
    onFavorite: PropTypes.func
};
