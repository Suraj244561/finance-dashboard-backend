# Finance Data Processing and Access Control Backend

Submission by **Suraj Yadav** (`surajyadavx.in@gmail.com`). This project implements a finance dashboard backend with user roles, access control, record management, summary APIs, validation, and SQLite persistence.

## Tech Stack
- Node.js + Express
- SQLite
- JWT authentication
- Joi validation
- Jest + Supertest

## Setup
```bash
npm install
cp .env.example .env
npm run seed
npm run dev
```

## Test Accounts
- Admin: `admin@finance.com` / `admin123`
- Analyst: `analyst@finance.com` / `analyst123`
- Viewer: `viewer@finance.com` / `viewer123`
- Inactive user: `inactive@finance.com` / `inactive123`

## API Overview
### Auth
- `POST /api/auth/login`

### Users (admin only)
- `GET /api/users`
- `POST /api/users`
- `PATCH /api/users/:id`

### Records
- `GET /api/records` — viewer, analyst, admin
- `POST /api/records` — admin
- `PUT /api/records/:id` — admin
- `DELETE /api/records/:id` — admin

Filters for `GET /api/records`:
- `type`
- `category`
- `startDate`
- `endDate`

### Dashboard
- `GET /api/dashboard/summary` — viewer, analyst, admin
- `GET /api/dashboard/trends` — analyst, admin

## Design Notes
- Clear separation of routes, controllers, services, middleware, utilities, and models.
- Role-based access control is enforced in middleware.
- Input validation is handled using Joi.
- Useful error responses are returned for invalid credentials, validation errors, duplicate users, missing records, and forbidden actions.
- SQLite was chosen for simplicity and persistence.
