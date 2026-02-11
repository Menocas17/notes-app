# Full Stack Notes Application

A simple web application that allows users to create, edit, delete, archive, and filter notes. This project is implemented as a Single Page Application (SPA) with a REST API backend.

## 🏗 Architecture

The application is divided into two distinct parts:

- **Frontend**: A SPA (Single Page Application) located in the `frontend/` folder.
- **Backend**: A REST API located in the `backend/` folder, following a layered architecture (Controllers, Services, Repositories).

## 🚀 Prerequisites

To run this application, ensure you have the following tools installed on your machine.

### General

- **Git**: Latest version
- **Bash/Zsh**: For running the startup script.

### Backend

_(Please update the versions below based on your implementation)_

- **Runtime**: Node.js v18.x
- **Package Manager**: npm v9.x
- **Database**: PostgreSQL 14

### Frontend

- **Runtime**: Node.js v18.x
- **Package Manager**: npm v9.x

## 🛠 Installation & Running

The project includes a helper script to set up and run the entire stack (Backend, and Frontend) with a single command.

### Quick Start

1. Open a terminal in the project root.
2. Run the startup script:

```bash
chmod +x run.sh
./run.sh
```

This script will:

- Install dependencies for both Backend and Frontend.
- Run database migrations
- Start both the Backend and Frontend servers concurrently.

### Manual Setup

If you prefer to run services manually:

**Backend:**

```bash
cd backend
# Install dependencies
npm install
# Start server
npm start
```

**Frontend:**

```bash
cd frontend
npm install
npm start
```

## Login

This app uses Oauth with Google, no password or email required
