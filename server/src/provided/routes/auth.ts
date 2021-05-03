import Router from '@koa/router'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SimpleUserRegistrationModel, UserLoginModel } from '@diploma/shared'

import type { JwtTokenData } from 'types/auth'

const SALT_ROUNDS = 3

const authRouter = new Router<{}, Context>({ prefix: '/auth' })

authRouter.post('/register', async (ctx) => {
  const userParseResult = SimpleUserRegistrationModel.safeParse(ctx.request.body)

  if (userParseResult.success) {
    const {
      data: { email, name, password },
    } = userParseResult

    const existingUser = await ctx.prisma.user.findUnique({ where: { email } })

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

      await ctx.prisma.user.create({ data: { email, name, password: hashedPassword } })

      ctx.status = 204

      return
    }
  }

  ctx.throw(400)
})

authRouter.post('/login', async (ctx) => {
  const userParseResult = UserLoginModel.safeParse(ctx.request.body)

  if (userParseResult.success) {
    const {
      data: { email, password },
    } = userParseResult

    const user = await ctx.prisma.user.findUnique({ where: { email } })

    if (user) {
      const isCorrectPassword = await bcrypt.compare(password, user.password)

      if (isCorrectPassword) {
        const userSession = await ctx.prisma.userSession.create({ data: { userId: user.id } })

        const tokenData: JwtTokenData = {
          sessionId: userSession.id,
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '2d' })

        ctx.body = { token }

        return
      }
    }
  }

  ctx.throw(401)
})

authRouter.get('/logout', async (ctx) => {
  await ctx.prisma.userSession.update({
    where: { id: ctx.state.sessionId },
    data: { endedAt: new Date() },
  })

  ctx.status = 204
})

export default authRouter
