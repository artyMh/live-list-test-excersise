# Technical test

## Building

To build this codebase you will need:
- NodeJS v20+
- NPM v10+

## Start locally

- Create `.env` configuration files for `backend` and `frontend`
- Install dependencies `npm i`
- Run backend `npm run start:frontend`
- Run frontend `npm run start:backend`

Default url for client is http://localhost:3000

Details of stories implemented located here http://localhost:3000/about

## Repository Organisation

This repository is monorepo done with NPM Workspaces

- `apps/backend` - backend part of application, containing business and WebSocket logic
- `apps/frontend` - frontend part of application, works with backend
- `packages/core` - things, which are shared between frontend and backend (DTOs, etc)

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

- Add better toast messages with usernames and items
- Use enums in websockets events
- Implement clean DTOs
- Rework project foldering (bring apps, packages/core)
  - Share DTOs between FE/BE better: `core` workspace
  - Add config `typescript` to be shared from root
  - Add config `eslint` to be shared from root
- Add save list to disk(persistance?)
- Nodejs add `helmet`, remove `frameguard` & `x-xss-protection`
- Fix cors between dev & prod run
- Add disconnect button
- Add route layout elements & add handle for 404?
- Use `zod` for object schema validator (and possibly add it to `core`?) ?
  - https://github.com/mantinedev/mantine-form-zod-resolver/issues/2
- Update:
  - Node to v22 and npm 11
  - React v19 + Mantine
  - SocketIO to version 4.8.0+ (https://socket.io/docs/v4/changelog/4.8.0) for transport feature using
- Add docker (docker example https://nodejs.org/en/download) https://github.com/remix-run/react-router-templates/blob/main/javascript/Dockerfile
- Add husky
- Add shadcn?
  - https://github.com/neigebaie/shadcn-ui-tree-view
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
