# Egginestudio

Egginestudio company website featuring studio information, games, careers, and contact details.

**Status:** Live · [Visit website](https://egginestudio.com/)

## Features

- Studio profile pages and game catalog
- Career information
- Shared page templates and components

## Technology

Eleventy 3, Nunjucks, Tailwind CSS 3.

## Running Locally

Install Node.js and npm versions that meet the dependency requirements in `package-lock.json`.

```sh
npm ci
npm run dev
```

Open the server address shown in the terminal. To build the site:

```sh
npm run build
```

Build output is written to `_site/`. The build output directory is not the repository's primary source.

## Structure

- `src/` — pages, templates, data, and assets.
- `.eleventy.js` — site generator configuration.
- `package.json` — dependencies and development commands.

## Repository Notes

Installed dependencies, caches, `.env` files, databases, and user uploads are not included. Brand names and third-party assets remain subject to their respective owners' rights. This repository does not grant a license for reuse.
