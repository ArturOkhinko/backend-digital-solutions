# Backend

Node.js + Express + TypeScript + Zod, layered architecture, no database.

## Layers

```
src/
  index.ts                 # entry point, starts the server
  app.ts                   # express app, middleware, mounts /api router
  routes/                  # HTTP routing layer
    index.ts
    getUsers.route.ts
  controllers/             # request/response + Zod validation
    getUsers.controller.ts
  services/                # business logic (not implemented yet)
    getUsers.service.ts
  schemas/                 # Zod schemas + inferred types
    getUsers.schema.ts
tests/
  getUsers.test.ts
```

## Endpoint

`GET /api/users?lastUserId=<id>&limit=20` — accepts the id of the last user and
returns the next 20 users. Business logic is a TODO in the service layer.

## Scripts

```
npm install
npm run dev        # start with ts-node-dev
npm run typecheck  # tsc --noEmit
npm run lint       # eslint (airbnb)
npm test           # jest
```
