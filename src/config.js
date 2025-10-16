// Central API base URL configuration
// Prefer environment variable at build-time (Netlify/.env), fallback to Render/Heroku URL if desired.
// Example local usage: create a .env with API_BASE_URL=https://your-service.onrender.com

// Parcel will inline process.env.* at build time if defined.
export const API_BASE_URL =
  typeof process !== "undefined" && process.env && process.env.API_BASE_URL
    ? process.env.API_BASE_URL.replace(/\/$/, "")
    : "https://movie-api-guis.onrender.com";
