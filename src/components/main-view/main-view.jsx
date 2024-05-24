import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";


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


    if (!user) {
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }

    if (selectedMovie) {
        return (
            <React.Fragment>
                <button
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                >
                    Logout
                </button>
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                />
            </React.Fragment>
        );
    }

    if (movies.length === 0) {
        return (
            <React.Fragment>
                <button
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                >
                    Logout
                </button>
                <div>The list is empty!</div>
            </React.Fragment>
        );
    }

    return (
        <div>
            <button
                onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            >
                Logout
            </button>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};