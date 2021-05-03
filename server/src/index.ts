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

main().catch((error) => logger.error(error))

process.on('uncaughtException', async (err) => {
  logger.error(`Uncaught exception: ${err.stack?.split('\n')}`)
})

process.on('unhandledRejection', async (err: Error) => {
  logger.error(`Unhandled rejection: ${err?.stack?.split('\n')}`)
  process.exit(1)
})
