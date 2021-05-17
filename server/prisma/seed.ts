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

  const bobbyProfile = (await prisma.profile.findFirst({ where: { user: { email: 'bobby@mail.com' } } }))!
  const helenProfile = (await prisma.profile.findFirst({ where: { user: { email: 'helen@mail.com' } } }))!
  const mistyProfile = (await prisma.profile.findFirst({ where: { user: { email: 'misty@mail.com' } } }))!

  await prisma.conversation.create({
    data: {
      title: 'Discussing stuff',
      createdById: bobbyProfile.id,
      participants: {
        createMany: {
          data: [
            {
              profileId: bobbyProfile.id,
            },
            {
              profileId: helenProfile.id,
            },
          ],
        },
      },
      messages: {
        createMany: {
          data: [
            {
              content: 'Hello world!',
              createdById: bobbyProfile.id,
            },
            {
              content: 'Hey Bobby!',
              createdById: helenProfile.id,
            },
          ],
        },
      },
    },
  })

  await prisma.conversation.create({
    data: {
      title: 'Mysterious mist?',
      createdById: mistyProfile.id,
      participants: {
        createMany: {
          data: [
            {
              profileId: mistyProfile.id,
            },
            {
              profileId: bobbyProfile.id,
            },
          ],
        },
      },
      messages: {
        createMany: {
          data: [
            {
              content: 'Hey guys!',
              createdById: mistyProfile.id,
            },
            {
              content: 'Hey Misty!',
              createdById: bobbyProfile.id,
            },
          ],
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
