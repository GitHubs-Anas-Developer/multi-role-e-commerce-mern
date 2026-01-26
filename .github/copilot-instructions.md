# Copilot / AI Agent Instructions for this repository

Quick reference for AI coding agents working on this MERN + Next.js admin project.

- **Project layout (big picture):**
  - `backend/` — Express + Mongoose API for admin functionality. Entry: `server.js`.
  - `frontend/admin/` — Next.js (app router) admin UI. Main app: `src/app/` and reusable UI in `src/components/`.

- **How the pieces talk:**
  - Frontend calls backend APIs under `/api/admin` (see `server.js` mounting `adminAuthRoutes`).
  - Backend uses `config/db.config.js` to connect to MongoDB and controllers in `controller/` to handle requests.
  - Shared patterns: token generation in `utils/generateToken.js`, auth middleware in `middleware/auth.middleware.js`.

- **Run / build commands (concrete):**
  - Backend (development): from repo root: `cd backend && npm run dev` — runs `nodemon server.js` (ES modules enabled).
  - Frontend admin (development): `cd frontend/admin && npm run dev` — Next dev server on `http://localhost:3000`.
  - Frontend build/start: `cd frontend/admin && npm run build` then `npm start`.

- **Important runtime details:**
  - Backend uses ES modules (`"type": "module"` in `backend/package.json`) — use `import`/`export`.
  - Server default port: `process.env.PORT || 5002` (see `backend/server.js`).
  - CORS allows `http://localhost:3000` by default; update `server.js` if adding other frontends.
  - Environment variables are loaded with `dotenv` — expect a `.env` for DB URL and secrets.

- **Project conventions & where to change things:**
  - Add backend routes in `backend/routes/`, handlers in `backend/controller/`, and data models in `backend/models/`.
  - Middleware lives in `backend/middleware/`. Use the existing `auth.middleware.js` pattern for protected routes.
  - Frontend API wrappers: `frontend/admin/src/services/api.js` — use it to centralize axios/fetch config and include credentials.
  - State: `frontend/admin/src/redux/slices/` — follow existing slice patterns (e.g., `auth/authSlice.js`, `auth/authThunk.js`).
  - UI components: `frontend/admin/src/components/` — prefer composition and small, focused components (see `components/layout/` for wrappers).

- **Examples (copy-paste patterns):**
  - Add a new backend route: create `routes/my.route.js`, implement controller in `controller/my.controller.js`, then `import` and `app.use('/api/admin/my', myRoute)` in `server.js` (or register from a central router file).
  - New frontend page: add under `frontend/admin/src/app/admin/...` to follow existing admin area structure; use `AdminWrapper.jsx` for consistent layout.

- **Testing & linting:**
  - There are no project tests in the repo by default. Frontend linting is available via `cd frontend/admin && npm run lint` (uses `eslint`).

- **Files to inspect for intent or breaking changes:**
  - Backend API wiring: `backend/server.js`
  - DB connection: `backend/config/db.config.js`
  - Auth flow: `backend/routes/auth.routes.js`, `backend/controller/auth.controller.js`, `backend/middleware/auth.middleware.js`
  - Frontend entry and routes: `frontend/admin/src/app/` and `frontend/admin/src/components/layout/`

- **When editing code, be cautious about:**
  - Converting CommonJS ↔ ES modules — backend is ESM; keep imports consistent.
  - CORS and cookie credentials — backend explicitly sets `credentials: true` on CORS.
  - Redux async thunks already in place for auth/product flows — reuse the patterns in `auth/authThunk.js`.

- **If you need more context:**
  - Open the files listed above to rediscover handler signatures and expected request/response shapes.
  - Ask for example `.env` values (I cannot access secrets) if you need to run the backend locally.

If anything above is unclear or you want a different level of detail (examples, more file links, or CI/deployment notes), tell me which areas to expand.
