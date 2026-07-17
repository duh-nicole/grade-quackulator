# 🦆 Grade Quackulator (v2.0)

A highly responsive grade calculation dashboard developed with React on PyCharm. This application is designed to help students track weighted assignment grades and calculate the specific benchmarks needed to hit their target grade goals.

---

## ⚡ Architectural Decision: Pure Client-Side Execution

This project was purposely designed and refactored to become a **pure client-side application** by using **state management** provided by React without any extra requests to the database server. 

### Why this architecture?
* **Instantaneous Updates (0ms Latency):** Calculations are done right there in the user's browser means DOM updates are done immediately upon user input. 
* **Privacy & Security by Design:** No user grade data is ever transmitted over the network or stored on an external database. 100% of the mathematical calculations happen locally within the client session.
* **Zero Infrastructure Overhead:** Eliminating the requirement for a backend API layer means the application has zero hosting costs, high uptime, and can be instantly deployed to static hosting platforms like GitHub Pages.

---

## 🛠️ Tech Stack & Key Concepts Used

* **Frontend Framework:** React (Functional Components)
* **Styling:** Custom Tailwind CSS (Cozy Retro Cybercafe Theme)
* **State Management (`useState`):** Uses declarative state for managing arrays of dynamically changing assignment objects safely.
* **Effect Hook (`useEffect`):** Automatically runs the math calculation engines when any input is changed without having to click a 'Submit' button.
* **Virtual DOM Rendering:** Utilizes (`.map()`) of dynamic arrays for efficiently updating only the changed DOM nodes in the browser. 

---

## 🎨 Key Features

1. **Dynamic Weighted Grade Tracker:** Assign or delete your assignments from anywhere in an unlimited capacity. Automatically updated weighted grade using deep state copy. 
2. **Dynamic Target Goal Engine:** Enter your goal grade, the number of possible points for the next assignment, and the total weight to automatically get your needed score.
3. **Responsive UI Window:** Developed using a retro-inspired, pixel-perfect browser window which scales perfectly on high resolution desktops and mobile devices.

---

## 🚀 Local Deployment

To run this React application on your local machine:

1. Clone the repository:
   ```bash
   git clone [https://github.com/duh-nicole/grade-quackulator.git](https://github.com/duh-nicole/grade-quackulator.git)
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Boot up local development server
   ```bash
   npm run dev
   ```
4. Open (`http://localhost:5173`) in your browser. 
