# Technical test

## Building

To build this codebase you will need:
- NodeJS
- NPM

## Start locally

- Install dependencies `npm i`
- Run backend `npm run start:frontend`
- Run frontend `npm run start:backend`

Default url for client is http://localhost:3000

Details of stories implemented located here http://localhost:3000/about

## Start with docker

## Repository Organisation

This repository is monorepo done with NPM Workspaces

- `apps/backend` - backend part of application, containing business and WebSocket logic
- `apps/frontend` - frontend part of application, works with backend
- `packages/core` - things, which are shared between frontend and backend

## Stack

### Frontend

- TypeScript + ESLint
- Vite
- React
- React Router
- Zustand
- Socket.IO Client

### Backend

- TypeScript + ESLint
- Express
- Socket.IO

## What could be better

- Rework project foldering (bring apps, packages)
- Add `core` workspace:
  - Add configs like `eslint`/`typescript` to be shared from root
  - Share DTOs between FE/BE better: `core` workspace
- Rework list item helper at backend as a service
- Nodejs add `helmet`
- Vite add `vite-tsconfig-paths`
- Add route layout elements & add handle for 404?
- Use `zod` for object schema validator (and possibly add it to `core`?)
  - https://github.com/mantinedev/mantine-form-zod-resolver/issues/2
- Update:
  - Node to v22 and npm
  - SocketIO to version 4.8.0+ (https://socket.io/docs/v4/changelog/4.8.0) for transport feture using
- Add docker (docker example https://nodejs.org/en/download) https://github.com/remix-run/react-router-templates/blob/main/javascript/Dockerfile
- Add husky
- Add home page with login
  - https://socket.io/get-started/private-messaging-part-1/
  - https://blog.logrocket.com/authentication-react-router-v6/
- Animate routing https://medium.com/@antonio.falcescu/animating-react-pages-with-react-router-dom-outlet-and-framer-motion-animatepresence-bd5438b3433b
  - https://github.com/orgs/mantinedev/discussions/1072
- Mby make zustand stores to be created/deleted dynamically
  - https://tkdodo.eu/blog/zustand-and-react-context
- Add unit tests
- Add e2e tests
- Add .editor config
- Add translate?
