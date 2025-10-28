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

Runs on: `http://localhost:3000`

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

### 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git push
```

### 4. Deploy Backend (Render.com)

- New Web Service → Connect GitHub
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `node index.js`
- **Environment Variables:**
  - `MONGODB_URI`
  - `PORT`
  - `JWT_SECRET`

Copy backend URL: `https://project-ott-backend.onrender.com`

### 5. Deploy Frontend (Render.com)

- New Static Site → Connect GitHub
- **Root Directory:** `project`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `build`
 

### 6. Update Backend CORS

Update backend with actual frontend URL, commit and push.

---

## 🐛 Troubleshooting

**CORS Error:**
- Check backend CORS has frontend URL
- Use `https://` not `http://`
- Check Render logs

**MongoDB Error:**
- Allow all IPs (0.0.0.0/0) in MongoDB Atlas
- Check `MONGODB_URI` is correct

**Build Failed:**
- Check `package.json` has correct scripts
- Verify all dependencies installed

---

## 📝 Common Commands

```bash
# Backend
npx nodemon              # Run with auto-reload
node index.js            # Run normally

# Frontend
npm start                # Development server
npm run build            # Production build

# Git
git add .
git commit -m "message"
git push
```

---

## 🔐 Security

- Never commit `.env` files (add to `.gitignore`)
- Use strong JWT secrets (32+ characters)
- Hash passwords with bcrypt

---

**Deployed URLs:**
- Frontend: `https://ott-project.onrender.com`
- Backend: `https://your-backend.onrender.com`
