# Desarrollo Full Stack

Academic full-stack project built to practice frontend development, Node.js backend fundamentals, REST-style endpoints, authentication, and MySQL integration.

## Tech stack

- HTML, CSS and JavaScript
- Node.js
- Express
- MySQL / mysql2
- bcryptjs
- dotenv

## Backend features

- User registration endpoint.
- Password hashing with bcrypt before database storage.
- Login validation using a hashed password comparison.
- MySQL queries with parameterized values.
- Database credentials loaded from environment variables.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Configure the local database values.
4. Run the backend with `npm start`.

Real credentials must never be committed to Git.

## Security notes

This project is intended for learning purposes. A production version should additionally include rate limiting, session or token-based authorization, HTTPS-only deployment, stronger validation, centralized error handling and automated tests.
