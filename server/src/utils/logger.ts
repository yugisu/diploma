import winston from 'winston'

const transports = []

if (process.env.NODE_ENV === 'development') {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.simple()),
      level: 'debug',
      handleExceptions: true,
    }),
  )
} else {
  transports.push(
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
      handleExceptions: true,
    }),
  )
}

const logger = winston.createLogger({
  level: 'debug',
  transports,
  exitOnError: true,
})

export { logger }
