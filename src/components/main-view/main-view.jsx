import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCarousel } from "../carousel/carousel";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

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

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    const handleMovieClick = (movie) => {
        // Optionally, you can define any additional logic for when a movie is clicked
        console.log('Movie clicked:', movie);
    };

    const findSimilarMovies = (selectedMovie) => {
        return movies.filter(movie => movie.Genre.Name === selectedMovie.Genre.Name && movie._id !== selectedMovie._id);
    };

    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">myFlix</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {user && (
                                <>
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                    <Button variant="light" onClick={handleLogout}>Logout</Button>
                                </>
                            )}
                            {!user && (
                                <>
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Routes>
                    <Route
                        path="/"
                        element={user ? (
                            <Row>
                                <MovieCarousel movies={movies} />
                                {movies.map((movie) => (
                                    <Col xs={12} sm={6} md={4} lg={3} key={movie._id} className="movie-card-container mb-5">
                                        <MovieCard movie={movie} onMovieClick={handleMovieClick} />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <Navigate to="/login" replace />
                        )}
                    />
                    <Route
                        path="/login"
                        element={<LoginView onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                            localStorage.setItem("user", JSON.stringify(user));
                            localStorage.setItem("token", token);
                        }} />}
                    />
                    <Route path="/signup" element={<SignupView />} />
                    <Route
                        path="/profile"
                        element={user ? (
                            <ProfileView
                                user={user}
                                movies={movies}
                                onLoggedOut={handleLogout}
                                onUserUpdate={(updatedUser) => {
                                    setUser(updatedUser);
                                    localStorage.setItem("user", JSON.stringify(updatedUser));
                                }}
                            />
                        ) : (
                            <Navigate to="/login" replace />
                        )}
                    />
                    <Route
                        path="/movies/:movieId"
                        element={<MovieView
                            movies={movies}
                            findSimilarMovies={findSimilarMovies}
                            onFavorite={(movie) => {
                                // Handle favorite logic here
                                console.log('Favorite movie:', movie);
                            }}
                        />}
                    />
                </Routes>
            </Container>
        </Router>
    );
};

MainView.propTypes = {
    onLoggedIn: PropTypes.func
};
