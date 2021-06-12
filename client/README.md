# My Recipes Book Client

Angular Application.

## Commands

Serve project in development mode.

```bash
npm start
```

Serve project in ssr mode.

```bash
npm start:ssr
```

Build project for development.

```bash
npm run build:dev
```

Build project for production.

```bash
npm run build
```

Build project for production with Angular Universal (SSR).

```bash
npm run build:ssr
```

Build project for production with Prerender.

```bash
npm run prerender
```

Test project.

```bash
npm test
```

Test project without watching files.

```bash
npm run test:without-watch
```

Lint project.

```bash
npm run lint
```

Lint project and fix files.

```bash
npm run lint:fix
```

Format project.

```bash
npm run format
```

Format project with watch mode.

```bash
npm run format:watch
```

Run builded project.

```bash
npm run serve
```

Run builded project after using ssr mode.

```bash
npm run serve:ssr
```

Analyze project.

```bash
npm run analyze
```

## Using Docker in Production

Run docker for production.

```bash
docker-compose -f docker-compose-prod.yml up --build
```

Run docker for production with Angular Universal (SSR).

```bash
docker-compose -f docker-compose-ssr.yml up --build
```

> NOTE: There are many ways to use Docker files in production environment please be careful with the way you are using it.
