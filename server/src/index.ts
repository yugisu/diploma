import 'reflect-metadata'

import dotenv from 'dotenv'

import { logger } from 'utils/logger'

import { initServer } from './server'

const main = async () => {
  // Obtain env variables from .env file if in development; otherwise, they should be specified explicitly
  if (process.env.NODE_ENV === 'development') {
    dotenv.config()
  }

  // Validate environment variables
  const requiredEnvVariables = ['NODE_ENV', 'DATABASE_URL', 'JWT_SECRET', 'PORT']

  const unspecifiedEnvVariable = requiredEnvVariables.find((varName) => !process.env[varName])
  if (unspecifiedEnvVariable) {
    throw new Error(`Environment variable "${unspecifiedEnvVariable}" not specified!`)
  }

  await initServer()
}

main()

process.on('uncaughtException', async (err) => {
  if (err instanceof Error) {
    logger.log({ level: 'error', message: `${err.stack || err}` })
  } else {
    logger.log({ level: 'error', message: err })
  }
})

process.on('unhandledRejection', async (err: Error) => {
  if (err instanceof Error) {
    logger.log({ level: 'error', message: `${err.stack || err}` })
  } else {
    logger.log({ level: 'error', message: err })
  }

  process.exit(1)
})
