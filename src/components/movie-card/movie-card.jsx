import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className=' movie-card h-100' onClick={() => onMovieClick(movie)}>
            <div className="ratio ratio-16x9">
                <Card.Img variant="top" src={movie.ImagePath} />
            </div>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                {/* space for more information about a movie */}
                <Button variant="light" onClick={() => onMovieClick(movie)}>Open</Button>
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
    onMovieClick: PropTypes.func.isRequired
};

