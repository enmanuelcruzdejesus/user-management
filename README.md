# User-Service 

A full-stack sample that exposes **CRUD endpoints for Users** (Node + Express + Firebase RTDB) and a **React client** (Create-React-App + Bootstrap).  
ZIP codes are geocoded via OpenWeather, write routes are secured with Firebase Auth, and the project ships with tests, pagination, and basic hardening.

---

## 🚀 How to run the code
git clone https://github.com/your-fork/user-endpoints.git
cd user-endpoints

### 1  Clone & install

```bash
git clone https://github.com/<your-fork>/user-service.git
cd user-service

# back-end
cd api
npm i
cd ..

# front-end
cd client
npm i
cd ..

1.2 Environment variables
Create .env files in each package:
PORT=8080
OPENWEATHER_API_KEY=7afa46f2e91768e7eeeb9001ce40de19
FIREBASE_SERVICE_ACCOUNT_JSON=<service-account JSON string>
FIREBASE_DATABASE_URL=https://<project>.firebaseio.com
FRONTEND_ORIGIN=http://localhost:3000

client/.env (optional for prod builds)
# REACT_APP_API_BASE_URL=https://api.example.com

# Terminal 1 – API
cd api
npm run dev          # nodemon src/index.js on :8080

# Terminal 2 – CRA
cd ../client
npm start            # CRA dev server on :3000, proxy to :8080
Open http://localhost:3000 — the UI lists users, paginates, and lets you add/edit/delete.

1.4 Run tests
cd api
npm test             # Jest  + mock Firebase

3 Implemented features
Category	Feature
API	CRUD /users (GET paginated, POST, PUT, DELETE)
/users/:id/localtime
Offset pagination ?page=&limit=
Geo-enrichment (lat/lon/timezone) via OpenWeather
Persistence	Firebase Realtime Database
Security	Helmet headers, rate-limit (100 req/15 min/IP),  CORS, Firebase Auth (Pending)
Validation	Joi schemas via middleware
React client	User list, Bootstrap UI, add/edit/delete cards, local-time alert, paginated list
Tooling	Jest unit tests (service) 
DX	Nodemon dev script, CRA proxy for CORS-free local dev

4 Assumptions
Only US ZIP codes (5-digit) are required for this demo.
Pagination defaults: limit=10 if not supplied; page numbers start at 1.
Firebase RTDB rules are open to authenticated users for "/users" (not included here).
For simplicity OpenWeather errors bubble up as 502/500 JSON errors.

5 Testing done
UnitTest: 	user.service create / read / update / delete with in-memory Firebase mock	npm test
Manual UI	Add/edit/delete via browser, pagination buttons, local-time fetch	npm run dev (both layers)
The test suite stubs external network (OpenWeather) and Firebase writes, ensuring deterministic runs without hitting third-party APIs.
