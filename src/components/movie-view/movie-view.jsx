export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div className="movie-view">
            <div>
                <img src={movie.ImagePath} alt={movie.Title} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Year: </span>
                <span>{movie.ReleaseYear}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
