import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCarousel } from "../carousel/carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Carousel } from "react-bootstrap";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (token) {
            fetchMovies();
        }
    }, [token]);

    const fetchMovies = async () => {
        try {
            const response = await fetch("https://afternoon-sands-47cb04422b71.herokuapp.com/movies", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error("Error fetching movies:", error.message);
        }
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }
    }, []);

    const getSimilarMovies = (selectedMovie) => {
        return movies.filter(movie => movie.Genre.Name === selectedMovie.Genre.Name && movie._id !== selectedMovie._id);
    };

    if (!user) {
        return (
            <Row className="justify-content-md-center">
                <Col md={5}>
                    <LoginView
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                            localStorage.setItem("user", JSON.stringify(user));
                            localStorage.setItem("token", token);
                        }}
                    />
                    or
                    <SignupView />
                </Col>
            </Row>
        );
    }

    if (selectedMovie) {
        return (
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Button variant="light"
                        onClick={() => {
                            setUser(null);
                            setToken(null);
                            localStorage.clear();
                        }}
                    >
                        Logout
                    </Button>
                    <MovieView
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                        similarMovies={getSimilarMovies(selectedMovie)}
                    />
                </Col>
            </Row>
        );
    }

    if (movies.length === 0) {
        return (
            <React.Fragment>
                <Button variant="light"
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                >
                    Logout
                </Button>
                <div>The list is empty!</div>
            </React.Fragment>
        );
    }

    return (
        <div>
            <Button variant="light"
                onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            >
                Logout
            </Button>
            <MovieCarousel movies={movies} />
            <Row>
                {movies.map((movie) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={movie._id} className="movie-card-container mb-5">
                        <MovieCard
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

MainView.propTypes = {
    onLoggedIn: PropTypes.func
};