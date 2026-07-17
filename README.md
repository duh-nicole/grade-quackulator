# 🦆 Grade Quackulator (v2.0)

A highly responsive, terminal-themed grade calculation dashboard built with React. This application is designed to help students track weighted assignment grades and calculate the specific benchmarks needed to hit their target grade goals.

---

## ⚡ Architectural Decision: Pure Client-Side Execution

This project was intentionally designed and refactored as a **pure client-side application** utilizing **React's state management** rather than relying on external database server round-trips. 

### Why this architecture?
* **Instantaneous Updates (0ms Latency):** By executing calculations directly in the user's browser, there are zero server lag delays. The DOM re-renders in real-time as the user types.
* **Privacy & Security by Design:** No user grade data is ever transmitted over the network or stored on an external database. 100% of the mathematical calculations happen locally within the client session.
* **Zero Infrastructure Overhead:** Eliminating the requirement for a backend API layer means the application has zero hosting costs, high uptime, and can be instantly deployed to static hosting platforms like GitHub Pages.

---

## 🛠️ Tech Stack & Key Concepts Used

* **Frontend Framework:** React (Functional Components)
* **Styling:** Custom Tailwind CSS (Retro Terminal Aesthetic)
* **State Management (`useState`):** Leverages declarative state to manage dynamic arrays of assignment objects securely.
* **Effect Hook (`useEffect`):** Automatically triggers mathematical calculation engines the instant any input fields are modified, eliminating the need for manual "Submit" triggers.
* **Virtual DOM Rendering:** Uses dynamic array mapping (`.map()`) and list diffing to update only changed nodes in the browser's DOM, optimizing client rendering performance.

---

## 🎨 Key Features

1. **Dynamic Weighted Grade Tracker:** Add or remove unlimited assignments dynamically. The weighted average adjusts instantly using deep state copying.
2. **Dynamic Target Goal Engine:** Input a goal grade, a future assignment's possible points, and its overall weight to instantly calculate exactly what you need to score.
3. **Responsive UI Window:** Built using a pixel-perfect, retro-inspired OS terminal container that automatically scales cleanly across high-resolution desktops and handheld mobile devices.

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
