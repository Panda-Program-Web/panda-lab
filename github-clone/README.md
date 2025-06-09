# GitHub Clone Backend

A minimal backend implementation of a GitHub-like service using [Hono](https://hono.dev/) and TypeScript.

## Features

- Create and list users
- Create and list repositories
- View repository details
- Create and list commits
- Manage files in repositories
- View commit diffs

Data is stored in memory using simple maps, so this is suited for demonstration or prototyping purposes only.

## Development

Install dependencies and run the server:

```bash
npm install
npm run build
npm start
```

The server listens on `http://localhost:3000`.

## Scripts

- `build` - compile TypeScript into the `dist/` directory
- `start` - run the compiled server with Node.js
