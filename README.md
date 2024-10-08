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

## Installation and Usage

1. Clone the repository: `git clone https://github.com/MoJoSchuck/myFlix-client.git`
2. Navigate to the project directory: `cd myFlix-client`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
The server runs by default on port 8080.

## Screenshots

### Web View
<img src="https://github.com/user-attachments/assets/acc160e4-f6aa-4910-970e-7620e50e4ce9" alt="Web View" width="600">

### Mobile View
<img src="https://github.com/user-attachments/assets/26931019-fbe6-4644-97a5-7179d71d9dd0" alt="Additional Mobile View" width="297">


## Live Demo

[myFlix](https://myflix777.netlify.app)

## Contributing

Please read the contribution guidelines before contributing.

## License

This project is licensed under the MIT License.
