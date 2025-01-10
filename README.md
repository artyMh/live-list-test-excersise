# Technical test

## How to launch

* Install dependencies `npm i`
* Run backend `npm run start:frontend`
* Run frontend `npm run start:backend`

Default url for client is http://localhost:3000

Details of stories implemented located here http://localhost:3000/about

## Stack

### Frontend

* TypeScript + ESLint
* Vite
* React + React Router
* Zustand
* Socket.IO

### Backend

* TypeScript + ESLint
* Express
* Socket.IO

## What could be better

* Rework project foldering (bring apps, packages)
* Add types/models workspace and use `zod` for object schema validator (https://www.freecodecamp.org/news/react-form-validation-zod-react-hook-form/)
* Change all forms to `react-hook-form`
* Add home page with login, https://socket.io/get-started/private-messaging-part-1/
  * https://tkdodo.eu/blog/zustand-and-react-context
* Animate routing https://medium.com/@antonio.falcescu/animating-react-pages-with-react-router-dom-outlet-and-framer-motion-animatepresence-bd5438b3433b
  * https://github.com/orgs/mantinedev/discussions/1072
* https://blog.logrocket.com/authentication-react-router-v6/
* Add proper BAL/DAL handling:
  * Share models between FE/BE better: models workspace
  * Rework list item helper at backend as a part of models workspace
* websocket/index.ts decouple business logic from socket
* Add packages like `eslint` to be shared from main `package.json`
* Add unit tests
* Add e2e tests
* Add docker (docker exampel https://nodejs.org/en/download)
* Add .editor config
* Add translate?
