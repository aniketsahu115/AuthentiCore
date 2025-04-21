# Project Overview 
**[Verify Your Product Here](https://authenticore.onrender.com/)**

# Authenticore

Authenticore is a full-stack web application designed with modern development practices for robust authentication workflows and seamless data handling.

---

## Tech Stack

### Frontend
- React.js with TypeScript
- Vite (Build Tool)
- Tailwind CSS (Styling)
- Radix UI (UI Components)
- React Query (Data Fetching)

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL with Drizzle ORM
- Passport.js (Authentication)

### Development Tools
- TypeScript (Type Safety)
- ESBuild (Production Builds)
- Dotenv (Environment Variable Management)

---

## Getting Started

### 1. Prerequisites
- Node.js (version 20 or higher recommended)
- PostgreSQL (Ensure it's installed and running)

### 2. Clone the Repository
```bash
git clone <your-repository-url
cd authenticore
```

### 3. Install Dependencies
npm install


### 4. Set Up the Database
psql -U postgres
CREATE DATABASE my_local_db;

### 5. Configure Environment Variables
DATABASE_URL=postgres://postgres:<your_password>@localhost:5432/my_local_db

### 6. Run Database Migrations
```
npm run db:push
```


### 7. Start the Development Server
npm run dev

The application will be available at: http://localhost:5000



