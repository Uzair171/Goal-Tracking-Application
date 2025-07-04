# 🎯 Goal Tracking Application

A modern, interactive React-based application to plan, track, and manage your goals quarter-wise with progress tracking, tactics, deadlines, and obstacles.

---

## ✨ Features

- 🗓 **Quarter Management**  
  - Add custom quarters like `Q1 2025`, `Q2 2026` with real date ranges  
  - Toggle visibility of quarters  
  - Persist quarters using Redux + redux-persist

- 🎯 **Goal Management**  
  - Add multiple goals under each quarter  
  - Set a deadline within the quarter date range  
  - See warning if the goal's deadline is missed  

- 📋 **Tactic Management**
  - Add multiple tactics per goal
  - Track status (completed/incomplete)
  - Inline editing and note-taking
  - Delete individual tactics
  - Completion progress bar

- 🚧 **Obstacle Tracking**
  - Add obstacles under each tactic
  - Mark obstacles completed
  - Tightly coupled with the tactic flow

- 🧠 **Smart UI**
  - Accordion-style quarters view
  - Clean goal and tactic layout
  - Animated toggles and transitions

---

## 🧑‍💻 Tech Stack

- **React** + Vite
- **Redux Toolkit** (for global state)
- **Redux Persist** (to persist data)
- **Tailwind CSS** (for styling)
- **Material UI (Accordion)**


