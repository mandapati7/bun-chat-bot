# ai-app-bun

A full-stack Bun monorepo template featuring TypeScript, React, Express, and Tailwind CSS. The client app fetches data from a server API endpoint and displays it with modern UI components. Includes API routing, Prettier, lint-staged, and Husky for code quality, plus automatic .env support for environment variables. Ideal for rapid, scalable web app development.

## Getting Started

### Install dependencies

```bash
bun install
```

### Run the server

```bash
cd packages/server
bun run index.ts
```

### Run the client

```bash
cd packages/client
bun run dev
```

## Features

- Bun as the package manager and runtime
- TypeScript for both client and server
- React + Tailwind CSS frontend
- Express backend with API routing
- Prettier, lint-staged, and Husky for code quality
- Environment variable support via .env

## Project Structure

- `packages/client` – React frontend
- `packages/server` – Express backend

---

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
