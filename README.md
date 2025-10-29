# 🎬 OTT Favorite Movies & TV Shows

Full-stack web application for managing favorite movies and TV shows.

---

## 📁 Project Structure

```
ott-project/
├── project/      # Frontend (React + Tailwindcss + Material UI)
├── server/       # Backend (Node.js + Express + Mongo DB)
```

---

## 💻 Local Development

### Backend (Server folder)

```bash
cd server
npm install
npx nodemon
```
 

Runs on: `http://localhost:5000`

---

### Frontend (Project folder)

```bash
cd project
npm install
npm start
```

Runs on: `http://localhost:5000`

---

## 🌐 Deployment

### 1. Fix CORS in Backend

**server/index.js:**
```javascript
app.use(cors({
    origin: ['https://frontend-ott-project.onrender.com', 'http://localhost:3000'],
    credentials: true
}));
```

### 2. Update Frontend API URL

**project/src/config.js:**
```javascript
export const ApiEndPoint = {
    corePath : "https://ott-project-backend-pkau.onrender.com/api"
}

```


## 📝 Common Commands

```bash
# Backend
npx nodemon              # Run with auto-reload
node index.js            # Run normally

# Frontend
npm start                # Development server
npm run build            # Production build
```

---

Authentication Implemented

You can test the authentication feature using the following credentials:

# Email: newuser@gmail.com
# Password: Newuser123

---

 Migration & Navigation Instructions

Signup → Create a new account

Login → Access your account

Home Page (Table) → View main content or data table

Logout → Safely log out of your session

Login again → Verify authentication works properly

---


**Deployed URLs:**
- Frontend: `https://ott-project.onrender.com`
- Backend: `https://your-backend.onrender.com`
