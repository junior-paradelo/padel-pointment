# 🎾 Padel-Pointment

A modern REST API web application for booking padel courts in your city.

## 📝 Project Description

Padel-Pointment is a platform that allows users to easily book padel courts in their local area. The application enables users to:

-   View available courts
-   Make court reservations
-   Manage their bookings
-   Track their playing history

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
    "@prisma/client": "^6.5.0",
    "bcryptjs": "^3.0.2",
    "compression": "^1.8.0",
    "dotenv": "^16.4.7",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.14.1",
    "response-time": "^2.3.3"
}
```

## 👨‍💻 Author

Junior Paradelo - [juniorparadelo@gmail.com](mailto:juniorparadelo@gmail.com) - [GitHub](https://github.com/junior-paradelo)
