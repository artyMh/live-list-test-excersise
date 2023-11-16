import winston from 'winston'

const logFormat = winston.format.printf(function(info) {
  const formatedDate = new Date().toLocaleString('default', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
    hour12: false,
  })

  return `${formatedDate} - [${info.level}]: ${JSON.stringify(info.message, null, 4)}`
})

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'server' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat)
    }),
    new winston.transports.File({ filename: 'logs.log' })
  ],
})

export default logger
