import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create test users
  await prisma.user.createMany({
    data: [
      { email: 'bobby@mail.com', name: 'Bobby', password: await bcrypt.hash('test-user-password', 3) },
      { email: 'helen@mail.com', name: 'Helen', password: await bcrypt.hash('test-user-password', 3) },
      { email: 'misty@mail.com', name: 'Misty', password: await bcrypt.hash('test-user-password', 3) },
    ],
  })

  const users = await prisma.user.findMany({ select: { id: true } })

  // Create test workspace with profiles for test users
  await prisma.workspace.create({
    data: {
      name: 'Fancy place',
      userProfiles: {
        createMany: {
          data: users.map(({ id }, idx) => ({
            userId: id,
            ...(idx === 0 ? { userRole: 'CREATOR' } : {}),
          })),
        },
      },
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
