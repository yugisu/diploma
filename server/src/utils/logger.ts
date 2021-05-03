import winston from 'winston'

const logger = winston.createLogger({
  format: winston.format.json(),
})

if (process.env.NODE_ENV === 'development') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  )
}

export { logger }
