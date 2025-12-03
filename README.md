# CircuitCrafter – An Interactive Digital Logic Simulator

## Problem Statement
Experimenting with digital logic circuits traditionally requires physical hardware, which is expensive, fragile, and time-consuming to set up. Students and beginners often struggle to visualize logic flow or test multiple configurations quickly.

**CircuitCrafter** solves this by providing a fully interactive, web-based digital logic simulator that allows users to design, connect, simulate, and manage circuits without needing any physical components.

The platform also includes a personal circuit library with searching, sorting, filtering, and pagination—plus a small, scaled-down public gallery for sharing and copying circuits—making experimentation fast, organized, and accessible.

## System Architecture
**Frontend** → **Backend (API)** → **Database**

### Frontend
*   **React.js**
*   **React Router** for page navigation
*   **Drag-and-drop circuit editor** (React DnD / Custom SVG logic)
*   **TailwindCSS** for UI

### Backend
*   **Node.js + Express.js**
*   Handles CRUD operations, public circuit access, and search/sort/filter/pagination logic

### Database
*   **MongoDB Atlas** for storing circuit JSON data, metadata, and user info

### Authentication
*   **JWT-based login/signup** (Optional) for saving personal circuits

### Hosting
*   **Frontend**: Vercel
*   **Backend**: Render / Railway
*   **Database**: MongoDB Atlas

## Key Features

### Authentication & Authorization
*   Optional user signup/login using JWT
*   Enables saving personal circuits

### Circuit Design & Simulation
*   Drag-and-drop placement of logic gates (AND, OR, NOT, XOR, NAND, NOR, XNOR)
*   Click-based wire connections
*   Real-time logic output updates
*   Interactive and highly visual editor

### CRUD Operations
*   Create, read, update, delete circuits
*   Circuits stored as JSON structures in the database

### Frontend Routing
Pages include:
*   **Home**
*   **Login**
*   **Simulator**
*   **My Circuits**
*   **Public Gallery**

### Personal Circuit Library (Primary Feature)
Includes required API data operations:
*   **Searching**: Search by circuit name.
*   **Sorting**: Alphabetical (A–Z / Z–A), Recently created.
*   **Filtering**: Circuit type (Combinational / Sequential).
*   **Pagination**: 10 circuits per page for organized browsing.

### Public Circuit Gallery
A minimal community space where users can:
*   Mark their circuits as **Public**
*   Browse other public circuits
*   Search by keyword
*   Sort by Newest / Alphabetical
*   Navigate via simple pagination

### Copy Circuit
*   Users can copy/duplicate any public circuit into their personal library for private editing and experimentation.

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, React Router, TailwindCSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Authentication** | JWT (optional) |
| **Hosting** | Vercel, Render, Railway |

## API Overview

### Authentication
| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/auth/signup` | POST | Register new user | Public |
| `/api/auth/login` | POST | Authenticate user | Public |

### Personal Circuits
| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/circuits` | GET | Get all personal circuits | Authenticated |
| `/api/circuits/:id` | GET | Get specific circuit | Authenticated |
| `/api/circuits` | POST | Save new circuit | Authenticated |
| `/api/circuits/:id` | PUT | Update circuit | Authenticated |
| `/api/circuits/:id` | DELETE | Delete circuit | Authenticated |

### Public Gallery
| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/public` | GET | Get public circuits (search/sort/pagination) | Public |
| `/api/public/:id/copy` | POST | Copy a public circuit to personal library | Authenticated |
