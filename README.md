# Pet Tracking System - Backend API

Robust RESTful API service built with Node.js, Express, TypeScript, and TypeORM to support the Digital Pet Passport and Tracking application. Connected to a fully cloud-hosted Neon PostgreSQL database.

## Architecture & Schema

The backend maps out the exact requirements of physical Pet Passports into a rigorous relational model:
- **`Owner`**: Manages pet owner identities, contacts, and emergency contacts. Links One-to-Many to Pets.
- **`Pet`**: Core entity representing tracked animals. Stores species, breed, distinctive markings, and sterilization records.
- **`MicrochipRecord`**: Stores official ISO-standard microchip markers, implant dates, and clinic locations. Links One-to-One with Pet.
- **`VeterinaryClinic`**: Registry of licensed vet practices and acting veterinarians.
- **`Vaccination`**: Logs immunizations (Rabies, Core, Additional) with specific batch numbers and expiration metrics. Links Many-to-One to both Pet and Clinic.
- **`MedicalRecord`**: Generic logging for diagnostics, surgeries, deworming, and ongoing treatments utilizing a scalable JSONB schema.

## Application Layers
To adhere to Enterprise REST standards, the backend utilizes a multi-tier abstraction structure:
- **Controllers** (`src/controllers/`): Strictly manage HTTP lifecycles, route path params, parse query flags, and return normalized payloads.
- **Services** (`src/services/`): Encapsulate pure database operations and business validation rules to keep endpoints modular and highly testable.
- **Middlewares** (`src/middlewares/`): Intercept incoming requests to guarantee payload parameters adhere to strict typing guidelines before engaging database connection handles.

## Technology Stack
- **Runtime**: Node.js v20+
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: TypeORM
- **Database**: PostgreSQL (Neon Serverless)

## Getting Started

### Prerequisites
- Node.js installed locally
- A valid Neon PostgreSQL connection string

### Installation
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="your_neon_postgres_connection_string"
   PORT=5000
   ```

### Running Locally
To launch the API server in development mode with live reloading:
```bash
npm run dev
```

### Database Migrations
We utilize standard TypeORM migrations to synchronize database state cleanly.
- **Generate a new migration** after updating entities:
  ```bash
  npm run migration:generate
  ```
- **Apply migrations** directly to your Neon DB:
  ```bash
  npm run migration:run
  ```
