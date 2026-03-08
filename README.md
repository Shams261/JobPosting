# Job Posting App (MCR)

A full-stack Job Posting application for employers built using React + Express.

## Tech Stack
- Frontend: React (Hooks), React Router, Bootstrap 5, React Toastify, Axios, Vite
- Backend: Node.js, Express, CORS, UUID
- Data Storage: Local JSON file (`server/jobs.json`)

## Features Implemented
1. Home page with job cards showing title, company, location, job type, See Details, and Delete.
2. Search bar to filter jobs by title.
3. Job details page with salary, description, and qualifications (ordered list).
4. Post Job page with required fields and validation.
5. Toast-based success and error handling (no native alerts).
6. Responsive navbar present on all pages.
7. Responsive card/grid/form spacing for desktop and mobile.
8. Full backend with CRUD endpoints used by frontend.

## Folder Structure
- `client/` React frontend
- `server/` Express backend

### Frontend structure (`client/src`)
- `app/` routing entry
- `layouts/` shared layout wrappers
- `components/navigation` navbar
- `components/jobs` job card UI
- `pages/jobs` page-level screens
- `api/` API client modules
- `constants/` app constants
- `utils/` helper utilities
- `styles/` global styles

### Backend structure (`server/src`)
- `app.js` express app setup
- `server.js` runtime entry point
- `config/` constants and file paths
- `modules/jobs/` routes, controller, service, validator

## Backend API
Base URL: `http://localhost:3001`

- `GET /health` -> Health check
- `GET /jobs` -> All jobs
- `GET /jobs?search=engineer` -> Filter jobs by title
- `GET /jobs/:id` -> Single job details
- `POST /jobs` -> Create job
- `DELETE /jobs/:id` -> Delete job

## Local Setup
### 1. Run backend
```bash
cd server
npm install
cp .env.example .env
npm start
```

### 2. Run frontend
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Open frontend at `http://localhost:5173`

## Environment Variables
### Frontend (`client/.env`)
- `VITE_API_BASE_URL` (default: `http://localhost:3001`)

### Backend (`server/.env`)
- `PORT` (default: `3001`)
