import 'reflect-metadata'

import { initServer, shutdownServer } from './server'

const enableGracefulShutdown = () => {
  process.on('SIGTERM', async () => {
    console.log('Graceful shutdown...')

    shutdownServer().catch((error) => console.error('Failed to shutdown server', error))
  })

  process.on('uncaughtException', async (err) => {
    console.error(`Uncaught exception: ${err.stack?.split('\n')}`)

    shutdownServer().catch((error) => console.error('Failed to shutdown server', error))
  })

  process.on('unhandledRejection', async (err: Error) => {
    console.error(`Unhandled rejection: ${err?.stack?.split('\n')}`)

    shutdownServer().catch((error) => console.error('Failed to shutdown server', error))
  })
}

const main = async () => {
  try {
    const server = await initServer()

    enableGracefulShutdown()
  } catch (error) {
    console.error(error)
  }
}

main()
