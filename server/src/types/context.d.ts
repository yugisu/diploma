/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type Koa from 'koa'
import type { PrismaClient, UserSession } from '@prisma/client'

type ApplicationStateExtension = {
  sessionId?: UserSession['id']
  userId?: UserSession['userId']
  profileId?: UserSession['profileId']
}

type ApplicationContextExtension = {
  prisma: PrismaClient
}

declare module 'koa' {
  interface DefaultState extends ApplicationStateExtension {}

  interface DefaultContext extends ApplicationContextExtension {}
}

declare global {
  type Context = Koa.Context

  type GqlContext = Pick<Context, 'prisma' | 'state'>
}

export {}
