import 'reflect-metadata'

import dotenv from 'dotenv'

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

main().catch((error) => console.error(error))

process.on('uncaughtException', async (err) => {
  console.error(`Uncaught exception: ${err.stack?.split('\n')}`)
})

process.on('unhandledRejection', async (err: Error) => {
  console.error(`Unhandled rejection: ${err?.stack?.split('\n')}`)
})
