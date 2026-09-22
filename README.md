# Road Safety Survey - React + Node.js + PostgreSQL/PostGIS

## Structure

road-safety-survey/
  backend/
  frontend/

## 1. PostgreSQL

Create a database and run database.sql.

Option A - psql:

    psql -U postgres
    CREATE DATABASE road_safety;
    \c road_safety
    \i 'C:/path/to/road-safety-survey/backend/database.sql'

If the database is created separately, remove/comment the first
`CREATE DATABASE road_safety;` line before running the remainder.

Enable PostGIS. The SQL script does this automatically:

    CREATE EXTENSION IF NOT EXISTS postgis;

## 2. Backend

Open a terminal:

    cd road-safety-survey/backend
    npm install

Copy `.env.example` to `.env` and set your PostgreSQL password.

Example:

    PORT=5000
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=road_safety
    DB_USER=postgres
    DB_PASSWORD=YOUR_POSTGRES_PASSWORD
    JWT_SECRET=CHANGE_THIS
    OTP_EXPIRY_MINUTES=5

Start:

    npm run dev

Health test:

    http://localhost:5000/api/health

Optional development Officer/Admin users:

    npm run create-users

Development credentials:
    Officer: 9000000001 / Officer@123
    Admin:   9000000002 / Admin@123

## 3. Frontend

Open another terminal:

    cd road-safety-survey/frontend
    npm install

Copy `.env.example` to `.env`:

    VITE_API_URL=http://localhost:5000/api

Start:

    npm run dev

Open the Vite URL shown in the terminal, normally:

    http://localhost:5173

## 4. Workflow

Surveyor:
    Register -> OTP -> password -> login -> create survey

Officer:
    Register -> OTP -> login -> view submitted surveys -> approve/reject

Rejected:
    Surveyor sees officer comments -> corrects -> resubmits same survey ID

Admin:
    Register -> OTP -> login -> view officer-approved surveys -> edit

## 5. Development OTP

The backend currently returns `developmentOTP` in the OTP response.
This is intentional for local development.

DO NOT expose the OTP in the API response in production.
Connect `sendRegistrationOTP()` to an SMS gateway and return only
a success message.

## 6. Security note

For a real deployment, unrestricted self-registration as ADMIN is not
recommended. Use an invitation/registration code or an administrator-
approved account creation process for privileged roles.

## 7. Photo storage

This version stores the photograph in PostgreSQL BYTEA for simplicity.
For large production deployments, move images to object/file storage
and keep only the URL/path in PostgreSQL.
