# 🎾 Padel-Pointment

A modern REST API web application for booking padel courts in your city.

## 📝 Project Description

Padel-Pointment is a platform that allows users to easily book padel courts in their local area. The application enables users to:

-   View available courts
-   Make court reservations
-   Manage their bookings

## 🛠️ Technologies Used

### 🖥️ Backend

-   **Node.js** - JavaScript runtime
-   **Express.js** - Web framework
-   **PostgreSQL** - Database
-   **Prisma ORM** - Database toolkit for Node.js
-   **bcryptjs** - Password hashing library
-   **jsonwebtoken** - JWT implementation for authentication
-   **compression** - Response compression middleware
-   **response-time** - Response time header middleware

### 🔧 Development Tools

-   **ESLint** - Code linting
-   **dotenv** - Environment variable management
-   **Prisma Migrations** - Database schema management
-   **Node.js Watch Mode** - Hot reloading for development

## 🚀 Getting Started

### 📋 Prerequisites

-   Node.js (>= 18.0.0)
-   PostgreSQL

### 📥 Installation

1. Clone the repository:

    ```
    git clone https://github.com/junior-paradelo/padel-pointment.git
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Copy `.env-example` to `.env` and update the database connection:

    ```
    cp .env-example .env
    ```

4. Run Prisma migrations:

    ```
    npx prisma migrate dev
    ```

5. Seed the database:

    ```
    npx prisma db seed
    ```

6. Start the development server:
    ```
    npm run dev
    ```

### 📦 Dependencies

```json
"dependencies": {
    "@prisma/client": "^6.6.0",
    "bcryptjs": "^3.0.2",
    "compression": "^1.8.0",
    "dotenv": "^16.4.7",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.14.1",
    "response-time": "^2.3.3"
}
```

## 📜 Available Scripts

```json
"scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js",
    "lint": "eslint src --fix",
    "migrate": "prisma migrate dev",
    "seed": "prisma db seed",
}
```

-   `npm start` - Run the server in production mode
-   `npm run dev` - Run the server with hot-reloading for development
-   `npm run lint` - Lint and fix code style issues
-   `npm run migrate` - Run Prisma migrations
-   `npm run seed` - Seed the database with initial data

## 📁 Project Structure

```
padel-pointment/
├── prisma/                  # Prisma schema and migrations
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Prisma schema definition
│   └── seed.js              # Database seeding script
├── src/
│   ├── controllers/         # Request controllers
│   │   ├── authController.js
│   │   ├── courtController.js
│   │   └── bookingController.js
│   ├── middlewares/         # Express middlewares
│   │   ├── auth.js          # Authentication middleware
│   │   └── validation.js    # Input validation middleware
│   ├── models/              # Data models
│   │   └── index.js         # Model exports
│   ├── routes/              # API routes
│   │   ├── auth.js
│   │   ├── courts.js
│   │   ├── bookings.js
│   │   └── index.js         # Route registration
│   ├── utils/               # Utility functions
│   │   ├── errors.js        # Error handling
│   │   └── logger.js        # Logging utilities
│   ├── app.js              # Express app setup
│   └── server.js           # Server entry point
├── .env                    # Environment variables
├── .env-example            # Example environment variables
├── .eslintrc.js           # ESLint configuration
├── .gitignore             # Git ignore file
├── package.json           # Package dependencies
└── README.md              # Project documentation
```

## 👨‍💻 Author

Junior Paradelo - [juniorparadelo@gmail.com](mailto:juniorparadelo@gmail.com) - [GitHub](https://github.com/junior-paradelo)
