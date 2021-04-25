import type { UserSession } from '@prisma/client'

export type JwtTokenData = {
  sessionId: UserSession['id']
}
