# Demo — Node / Vite

React + TypeScript frontend built with Vite and bundled via Node.

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
cp .env.example .env
# fill in VITE_API_URL and VITE_WS_URL
npm install
```

## Development

```bash
npm run dev
```

Starts Vite dev server with HMR at `http://localhost:5173`.

## Production

**Build:**

```bash
npm run build
```

Outputs to `dist/`.

**Serve:**

```bash
npm run preview
```

Serves the built `dist/` folder via Vite's preview server.

## Linting

```bash
npm run lint
```
