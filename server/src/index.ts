import 'reflect-metadata'

import { initServer } from './server'

const enableGracefulShutdown = () => {
  process.on('SIGTERM', async () => {
    console.log('Graceful shutdown...')
  })

  process.on('uncaughtException', async (err) => {
    console.error(`Uncaught exception: ${err.stack?.split('\n')}`)
  })

  process.on('unhandledRejection', async (err: Error) => {
    console.error(`Unhandled rejection: ${err?.stack?.split('\n')}`)
  })
}

const main = async () => {
  try {
    await initServer()

    enableGracefulShutdown()
  } catch (error) {
    console.error(error)
  }
}

main()
