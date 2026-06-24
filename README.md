# Demo — Bun

React + TypeScript frontend built with Bun's native bundler (no Vite).

## Prerequisites

- [Bun](https://bun.sh) 1.x

## Setup

```bash
cp .env.example ../.env
# fill in BUN_PUBLIC_API_URL and BUN_PUBLIC_WS_URL
bun install
```

> The env file is read from the **parent directory** (`../.env`) at runtime.

## Development

```bash
bun run dev
```

Starts Bun's built-in server with HMR at `http://localhost:3000`.

## Production

**Build:**

```bash
bun run build
```

Bundles the app into `dist/` (outputs `serve.js`).

**Serve:**

```bash
bun run preview
```

Runs `dist/serve.js` with `NODE_ENV=production`.

## Linting

```bash
bun run lint       # check
bun run format     # auto-fix formatting
```
