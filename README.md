# 🏋️‍♂️ GymBro App

**GymBro** is a comprehensive fitness management application designed to help users track their physical metrics, manage their profiles, and stay on top of their workout goals.

This project is built as a **monorepo**, consisting of two independent but connected services:
- **Client:** The frontend React application built with Vite.
- **Server:** A robust backend API built with **NestJS**.

---

## 🛠 Tech Stack

### Client
- **React** (Vite)
- **Redux Toolkit** (Centralized State Management)
- **Auth0** (Secure Authentication)
- **Axios** (API Requests)
- **React-Bootstrap** & **Tailwind CSS** (Hybrid Styling Approach)

### Server (NestJS)
- **NestJS** (Modular Framework)
- **TypeScript** (Strict Type Safety)
- **Passport-Auth0** (JWT Strategy & Guards)
- **PrismaORM / PostgreSQL** (Database Integration)

---

## 🚀 Quick Start

To get the project running locally, follow these steps:

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/Ivan9160/gymBroApp.git
cd gymBroApp
\`\`\`

### 2. Setup Backend (Server)
Navigate to the server directory, install dependencies, and start the NestJS service:
\`\`\`bash
cd server
npm install
npm run start:dev
\`\`\`
*Note: The NestJS server typically runs on http://localhost:3000.*

### 3. Setup Frontend (Client)
In a **new terminal session**, navigate to the client directory, install dependencies, and start the app:
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`
*Note: The client typically runs on http://localhost:5173.*

---

## 🔐 Environment Variables

Before running the application, you must set up your environment variables. Create a .env file in the respective directories.

**Client (/client/.env):**
\`\`\`env
VITE_API_URL=http://localhost:3000
\`\`\`

**Server (/server/.env):**
\`\`\`env
PORT=3000
DATABASE_URL=your_database_url
VITE_URL=http://localhost:5173

\`\`\`

---

## 🧠 Core Logic & Architecture

- **User Data Synchronization:** The app uses Auth0 for identity management. Upon successful login, the system automatically verifies if a profile exists in the local database using the **auth0Id** (found in the sub field of the Auth0 user object).
- **Anti-Flicker Logic:** We implemented an dbLoading state flag within Redux and the userDataForm component. This prevents the "flash" of the registration form while the user's existing profile data is being retrieved from the server.
- **Persistent Metrics:** User-specific data such as height, weight, and fitness goals are managed via Redux Toolkit to ensure a reactive and consistent UI across the application. Data is saved to redux on unfocusing of the field and on response from server

---

## 📝 Recent Implementation Details

- ✅ Integrated Auth0 Login/Logout flow with Redux state synchronization.
- ✅ Developed UserDataForm supporting both POST (create) and PUT (update) methods for user profiles.
- ✅ Optimized UI layout for consistent header and footer positioning across all pages.
EOF