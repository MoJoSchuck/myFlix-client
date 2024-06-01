// src/components/profile-view/profile-view.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies, onLoggedOut, onUserUpdate, token }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    const favoriteMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie._id));

    const handleUpdate = () => {
        const updatedUser = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        };
        onUserUpdate(updatedUser);
    };

    const removeFavorite = async (movieId) => {
        try {
            const response = await fetch(`https://afternoon-sands-47cb04422b71.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) {
                throw new Error("Failed to remove favorite movie");
            }
            const updatedUser = { ...user, FavoriteMovies: user.FavoriteMovies.filter(id => id !== movieId) };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Error removing favorite movie:", error.message);
        }
    };

    return (
        <Row>
            <Col md={6}>
                <h2>User Profile</h2>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                    <Button variant="secondary" onClick={onLoggedOut}>
                        Logout
                    </Button>
                </Form>
            </Col>
            <Col md={6}>
                <h3>Favorite Movies</h3>
                <Row>
                    {favoriteMovies.map((movie) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={movie._id}>
                            <MovieCard movie={movie} onFavorite={() => removeFavorite(movie._id)} />
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
};

ProfileView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string,
        FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
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
        })
    ).isRequired,
    onLoggedOut: PropTypes.func.isRequired,
    onUserUpdate: PropTypes.func.isRequired,
    token: PropTypes.string
};
