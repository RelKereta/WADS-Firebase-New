# Todo App with Firebase Authentication and Firestore

This is a simple To-Do List application built with **React.js, Firebase Authentication, and Firestore**. The app allows users to sign up, log in, and manage their tasks while storing their data in Firestore.

---

## Features
- **User Authentication** (Signup, Login, Logout)
- **CRUD Operations for To-Do List** (Add, Edit, Complete, Delete tasks)
- **Firestore Integration** (Tasks are stored per user)
- **Protected Routes** (Only logged-in users can access their tasks)
- **Profile Editing** (Users can update their profile details)

---

## Project Structure
```
WADS-Firebase/
│── src/
│   ├── components/
│   │   ├── TodoList.jsx
│   │   ├── TodoForm.jsx
│   │   ├── Todo.jsx
│   │   ├── Profile.jsx
│   │   ├── Navbar.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   ├── services/
│   │   ├── firebase.js
│   │   ├── auth.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── LandingPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│── .env
│── tailwind.config.js
│── package.json
│── vite.config.js
│── README.md
```

---

## Setup Instructions

### **Clone the Repository**
```sh
git clone <your-repo-url>
cd WADS-Firebase
```

### **Install Dependencies**
```sh
npm install
```

### **Run the App**
```sh
npm run dev
```
