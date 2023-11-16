import express from 'express'
import { createServer } from 'node:http'
import configuration from 'dotenv'
import cors from 'cors'

import createWsServer from './websocket'
import logger from './logger'

configuration.config()
const SERVER_PORT = process.env.PORT

const app = express()
const server = createServer(app)
createWsServer(server)
app.use(cors())

server.listen(SERVER_PORT, () => {
  logger.info(`Server running at port ${SERVER_PORT}`)
})
