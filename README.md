# myFlix React App

## Objective
The myFlix React app is the client-side for an app called myFlix, which is based on existing server-side code (REST API and database). The main goal is to create a single-page, responsive app with routing, rich interactions, several interface views, and a polished user experience.

## Context
Client-side development has become increasingly prominent with the advent of modern browsers and libraries such as React. The myFlix app aims to provide movie enthusiasts with access to information about different movies, allowing them to save data about their favorite movies.

## Technologies

- React
- ES2015+
- Bootstrap
- Parcel
## Features

### Core Features
- **Main view**
  - Returns ALL movies to the user (each movie item with an image, title, and description)
  - Filtering the list of movies with a “search” feature
  - Ability to select a movie for more details
  - Ability to log out
  - Ability to navigate to Profile view
- **Single Movie view**
  - Returns data (description, genre, director, image) about a single movie to the user
  - Allows users to add a movie to their list of favorites
- **Login view**
  - Allows users to log in with a username and password
- **Signup view**
  - Allows new users to register (username, password, email, date of birth)
- **Profile view**
  - Displays user registration details
  - Allows users to update their info (username, password, email, date of birth)
  - Displays favorite movies
  - Allows users to remove a movie from their list of favorites
  - Allows existing users to deregister

### Optional Features
- **Actors view**
  - Allows users to view information about different actors
- **Genre view**
  - Returns data about a genre, with a name and description
  - Displays example movies
- **Director view**
  - Returns data about a director (name, bio, birth year, death year)
  - Displays example movies from the director

## Installation and Usage

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd myflix-react`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
The server runs by default on port 8080.

## Contributing

Please read the contribution guidelines before contributing.

## License

This project is licensed under the MIT License.

## Project URL

[myFlix](https://myflix777.netlify.app)


