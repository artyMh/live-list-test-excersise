import express from 'express'
import {createServer} from 'node:http'
import configuration from 'dotenv'
import cors from 'cors'

/*
 * import frameguard from 'frameguard'
 * import xXssProtection from 'x-xss-protection'
 */

import createWsServer from './websocket/index.js'
import logger from './logger.js'

configuration.config()
const SERVER_PORT = process.env.PORT

const app = express()
const server = createServer(app)
createWsServer(server)

app.use(cors())
// app.use(frameguard({ action: 'deny' }))
// app.use(xXssProtection())

server.listen(SERVER_PORT, () => {

  logger.info(`Server running at port ${SERVER_PORT}`)

})
