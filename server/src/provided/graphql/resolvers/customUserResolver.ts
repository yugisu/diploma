import { Query, Resolver } from 'type-graphql'

import { User } from 'generated/typegraphql-prisma'

@Resolver(() => Query)
export class CustomUserResolver {
  @Query(() => User)
  user(): User {
    return {
      id: 1,
      createdAt: new Date(),
      name: 'Hello!',
    }
  }
}
