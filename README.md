# TradeSphere (Zerodha-style paper trading)

This project has **three apps**:

| App | Folder | Local URL | What it is |
| --- | --- | --- | --- |
| Website | `frontend` | http://localhost:3000 | Landing pages, signup, login |
| Dashboard | `dashboard` | http://localhost:3001 | Trading terminal (holdings, orders, funds) |
| API | `backend` | http://localhost:3002 | Database + login + buy/sell APIs |

This is **paper trading** (practice money). It is not connected to a real broker.

## 1. What you need on your computer

1. [Node.js LTS](https://nodejs.org/) (includes npm). After install, open a **new** terminal and run `node -v`.
2. A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (cloud database). A URI is already in `backend/.env`. If connection fails, create your own cluster and replace `MONGO_URL`.

## 2. Install (one time)

Open PowerShell in the `Zerodha` folder (the folder that contains `frontend`, `dashboard`, and `backend`):

```bash
npm install
npm run install-all
```

That installs tools for all three apps.

## 3. Run the whole app

In the same `Zerodha` folder:

```bash
npm start
```

Wait until you see:

- API running on http://localhost:3002
- frontend on http://localhost:3000
- dashboard on http://localhost:3001 (if the browser asks “use another port?”, type `y` only if 3001 is busy)

### How to check that things are fixed

1. Open http://localhost:3000 — home hero image, logos, and product screenshots should load (no broken images).
2. Open About, Product, Pricing, Support — images still load (paths start with `/media/images/`).
3. Open http://localhost:3002/health — should show `"ok": true` and `"db": "connected"`.
4. On the website, click **Login**. Use:
   - Email: `demo@tradesphere.com`
   - Password: `Demo@123`
5. You should land on the **dashboard**. Holdings, positions, and funds should show numbers from MongoDB (not empty).
6. In the left watchlist, hover a stock → **Buy**. Enter qty and price → Buy. Then open **Orders** and **Holdings** — the new order and updated quantity/cash should appear.
7. Open **Funds**, add or withdraw an amount, and confirm the available cash changes.
8. Click **Signup** and create a new account. That user gets their own holdings and ₹1,00,000 paper cash.

If the dashboard says “Start the backend on port 3002”, the API is not running or MongoDB blocked your IP.

### MongoDB Atlas (if database fails)

1. Atlas → Network Access → Add IP Address → **Allow Access from Anywhere** (`0.0.0.0/0`) for learning, or add your current IP.
2. Atlas → Database Access → user can read and write.
3. Put the connection string in `backend/.env` as `MONGO_URL=...` and include `/tradesphere` before the `?`.

## 4. Run apps in three terminals (optional)

```bash
cd backend
npm start
```

```bash
cd frontend
npm start
```

```bash
cd dashboard
npm start
```

## 5. Deploy for real users

You deploy **three** services. After each URL is live, put those URLs into environment variables.

### A. Backend on Render (free web service)

1. Push this project to GitHub.
2. [Render](https://render.com) → New → Web Service → connect the GitHub repo.
3. Root directory: `backend`
4. Build: `npm install`
5. Start: `npm start`
6. Environment:
   - `MONGO_URL` = your Atlas string (with `/tradesphere`)
   - `JWT_SECRET` = a long random password
   - `PORT` is set by Render automatically
7. After deploy, open `https://YOUR-API.onrender.com/health`

Free Render apps sleep when idle; the first request can take ~30 seconds.

### B. Website on Vercel

1. [Vercel](https://vercel.com) → Import GitHub repo.
2. Root directory: `frontend`
3. Framework: Create React App
4. Environment:
   - `REACT_APP_API_URL` = `https://YOUR-API.onrender.com`
   - `REACT_APP_DASHBOARD_URL` = your dashboard Vercel URL (add this after step C, then redeploy)
5. Deploy. You get something like `https://your-site.vercel.app`

`frontend/vercel.json` already handles React Router pages.

### C. Dashboard on Vercel

1. Vercel → **second** project from the same repo.
2. Root directory: `dashboard`
3. Environment:
   - `REACT_APP_API_URL` = `https://YOUR-API.onrender.com`
   - `REACT_APP_FRONTEND_URL` = `https://your-site.vercel.app`
4. Deploy.

Then go back to the **frontend** Vercel project and set `REACT_APP_DASHBOARD_URL` to the dashboard URL, then Redeploy.

### D. Atlas for production

- Network Access: allow `0.0.0.0/0` (Render has changing IPs) or use Atlas + Render private link later.
- Never commit real passwords. Keep them only in Render/Vercel env settings.

## Demo account

- Email: `demo@tradesphere.com`
- Password: `Demo@123`

Created automatically the first time the backend starts.
