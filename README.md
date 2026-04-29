# Nuxt 3 Orders App

This is a Nuxt 3 application built with Pinia and Vuetify that demonstrates a real-world order management dashboard with filtering, pagination, routing sync, authentication (mock), and unit-tested business logic.

The project focuses on clean state management, URL-driven UI state, and maintainable frontend architecture.

---

## Tech Stack

Nuxt 3, Vue 3 (Composition API), Pinia, Vuetify 3, TypeScript, Vitest

---

## Features

- Order list from static JSON (`/public/orders.json`)
- Filtering by status
- Pagination with correct slicing logic
- URL synchronization (`status`, `page`)
- Order details page
- Back navigation preserving state
- Defensive UI states (loading, empty, filtered empty)

---

## Authentication (Mock)

Simple mock authentication using userId only (no password). State is stored in `localStorage`. Routes under `/account` are protected. No backend is used.

---

## State Management (Pinia)

Centralized store handles all business logic:

- orders
- filters (status)
- pagination (currentPage, perPage)

Getters:

- filteredOrders
- paginatedOrders
- totalPages
- getOrderById

All UI is fully derived from state, making the logic predictable and testable.

---

## Data Source

All data comes from a static file:

/public/orders.json

No API or backend integration is used.

---

## Limitations

No backend integration, no real authentication system, no CRUD operations, static dataset only, no real-time updates.

---

## Architecture Notes

Store-first architecture (Pinia), URL-driven state (filters + pagination synced with query params), defensive UI (loading and empty states), fully testable business logic layer, clean separation of UI and state.

---

## Project Goal

This project demonstrates Nuxt 3 application structure, Pinia state management, real-world dashboard patterns, testable frontend architecture, and clean scalable UI logic.

---

## Testing

Unit tests (Vitest) cover core business logic:

- filtering by status
- pagination logic

To run tests:

```bash
npm run test
```

---

## Setup & Commands

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
