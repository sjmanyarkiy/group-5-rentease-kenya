<!-- Repository: group-5-rentease-kenya (frontend) -->
# Copilot / AI contributor quick instructions

This repository is a small React frontend that expects a json-server (db.json) backend during development. The file below focuses on actionable, project-specific details an AI coding agent needs to be productive immediately.

- Project entrypoints: `src/index.js` (Router + `BookingsProvider`) and `src/routes.js` (route list). Note: `src/App.js` exists but the app uses `RouterProvider` from `index.js` instead.
- Local fake API: `db.json` (root) exposes three main endpoints: `/properties`, `/bookings`, `/tenants` (see `db.json`). Components fetch these directly.

How to run locally (recommended)

1. Start the JSON server on a port other than 3000 (React dev server defaults to 3000). Example (zsh):

```bash
# run json-server on 3001 so it doesn't conflict with React's 3000
npm run server -- --port 3001
```

2. Start the frontend and point it at the API you started:

```bash
# explicit env for the frontend
REACT_APP_API_URL=http://localhost:3001 npm start
```

Notes: package.json includes a `server` script that runs `json-server --watch db.json --port 3000`. Because that defaults to 3000 it will conflict with `npm start`. Prefer overriding the port (see example) or set `REACT_APP_API_URL` to match the server port.

Key code patterns and examples (do not change without reason)

- Environment: components/readers use an API constant pattern:

  - `const API = process.env.REACT_APP_API_URL || 'http://localhost:3000'`

  See `src/components/PropertyList.js` and `src/components/PropertyCard.js` which use `fetch(`${API}/properties`)` and `fetch(`${API}/bookings`)`.

- Context pattern: bookings are provided via React Context. `src/context/BookingsContext.js` defines `BookingsProvider`, exposes `useBookings()` and a local `addBooking(newBooking)` that updates local state. The app wraps the router with `<BookingsProvider>` in `src/index.js`.

- Routing: app routes live in `src/routes.js`. Routes include `/`, `/properties`, `/properties/:id`, `/bookings`, `/tenants` and render components from `src/pages` and `src/components`.

- Data shape: `db.json` shows the expected fields. For example a property has `id, location, image, rent, bedrooms, bathrooms, status, description`. Bookings have `id, propertyId, tenantName, employment, income, moveInDate, emergencyContact, status`.

Conventions & small gotchas

- Fetch is used directly (no axios). Return values and mutations are often handled by updating local state or Context manually. When adding new server-backed mutations, update local state in the corresponding provider/component to keep UI consistent.
- The project uses Bootstrap classes (and Tailwind is present as a dependency) — prefer existing Bootstrap markup for consistency unless a conversion is necessary.
- Testing / scripts: `npm test` exists (react-scripts). There is no CI config in repo root (.github/ workflows not present).

Files worth inspecting when making changes

- `db.json` — canonical local API data (edit & restart json-server to change seed data)
- `package.json` — scripts & dependencies
- `src/context/BookingsContext.js` — Context API usage & addBooking behavior
- `src/components/PropertyList.js`, `PropertyCard.js`, `PropertyItem.js`, `BookingsList.js`, `TenantList.js` — typical component patterns and API usage
- `src/pages/Home.js`, `src/pages/NavBar.js` — layout and navigation patterns
- `src/routes.js` & `src/index.js` — routing and provider wiring

When modifying or adding endpoints

- Update `db.json` and restart the json-server. The frontend expects REST-style endpoints (`GET /properties`, `POST /bookings`, etc.).
- For POST handlers, components often optimistically update state via provider helpers (e.g. `addBooking`) — follow that pattern for consistency.

What not to change blindly

- `src/index.js` provider and routing wiring — many components expect `BookingsProvider` to be present
- The default API pattern (`process.env.REACT_APP_API_URL || ...`) — preserve it so maintainers can override the backend during testing and staging

If you are an AI agent making code changes

- Keep edits small and focused. Reference the DB shapes in `db.json` for sample objects when creating mocks or tests.
- When adding new scripts or ports, update README.md with the exact commands and explain port choices.
- If changing the port defaults in `package.json` server script, mention the reason in the commit message and README.

If anything in these instructions is unclear or you want me to add examples (PR templates, CI steps, or a CONTRIBUTING.md), tell me which part to expand. I can iterate and expand the instructions with exact code snippets or PR checklist items.
