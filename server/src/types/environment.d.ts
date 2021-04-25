declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT: number
      JWT_SECRET: string
    }
  }
}

export {}
