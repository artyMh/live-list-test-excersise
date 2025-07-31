# Technical test

## Requirements

To build & run this codebase you will need:
- NodeJS v20+
- NPM v10+

## Start dev locally

- Create `.env` configuration files for `backend` and `frontend` from `.env.example`
- Install dependencies `npm i`
- Run backend `npm run start:backend`
- Run frontend `npm run start:frontend`

Default url for frontend is http://localhost:3000

Default url for backend is http://localhost:4000

Details of stories implemented located here http://localhost:3000/about

## Start with Docker

### Docker compose

Go to root directory and run `docker compose up`

### Backend

Build & run `apps/backend` image:

1. Go to root directory and run docker image build:
    - `docker build -t live-list-backend . -f Dockerfile.backend`

2. Then run created image
    - `docker run -dp 4000:4000 live-list-backend`
  
### Frontend

Build & run `apps/frontend` image:

1. Go to root directory and run docker image build:
    - `docker build -t live-list-frontend . -f Dockerfile.frontend`
2. Then run created image
    - `docker run -dp 80:3000 live-list-frontend`

<br/>

## Repository Organisation

This repository is monorepo done with NPM Workspaces

- `apps/backend` - backend part of application, containing business and WebSocket logic
- `apps/frontend` - frontend part of application, works with backend
- `packages/core` - code & logic, which is shared between frontend and backend (DTOs, etc)

## Stack

### Frontend

- TypeScript + ESLint
- Vite
- React
- React Router
- Zustand
- Socket.IO Client
- Docker

### Backend

- TypeScript + ESLint
- Express
- Socket.IO
- Docker

## What could be better

- Add better toast messages with usernames and items
- Add handler for offline
- Add disconnect button
- Add route layout elements & add handle for 404?
- Use `zod` for object schema validator (and possibly add it to `core`?) ?
  - https://github.com/mantinedev/mantine-form-zod-resolver/issues/2
- Rework project foldering (bring apps, packages/core)
  - Share DTOs between FE/BE better: `core` workspace
  - Add config `typescript` to be shared from root
  - Add config `eslint` to be shared from root
- Nodejs add `helmet`, remove `frameguard` & `x-xss-protection`
- Fix cors between dev & prod run
- Update:
  - Node to v22 and npm 11
  - React v19 + Mantine
  - SocketIO to version 4.8.0+ (https://socket.io/docs/v4/changelog/4.8.0) for transport feature using
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
