# 🦆 Grade Quackulator (Full-Stack)

A web application designed to calculate and simulate weighted grades, featuring a React frontend and a Python FastAPI
backend.

## 📁 Repository Structure

- `/client`: Contains the React frontend components handling dynamic state and user interface.
- `/server`: Contains the FastAPI backend handling routing and API endpoints.

## 🛠️ How to Run

### Backend (Server)

1. Navigate to the server directory: `cd server`
2. Install FastAPI and Uvicorn: `pip install fastapi uvicorn`
3. Run the live server: `uvicorn main:app --reload`

### Frontend (Client)

- The core logic lives in `GradeQuackulator.jsx`, built using declarative React state hooks (`useState`, `useEffect`) to
  dynamically manage assignment arrays and eliminate manual DOM manipulation.
