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

  const workspace = (await prisma.workspace.findFirst({ where: { name: 'Fancy place' } }))!

  const bobbyProfile = (await prisma.profile.findFirst({ where: { user: { email: 'bobby@mail.com' } } }))!
  const helenProfile = (await prisma.profile.findFirst({ where: { user: { email: 'helen@mail.com' } } }))!
  const mistyProfile = (await prisma.profile.findFirst({ where: { user: { email: 'misty@mail.com' } } }))!

  await prisma.activity.create({
    data: {
      title: 'Discussing stuff',
      workspaceId: workspace.id,
      participants: {
        createMany: {
          data: [
            {
              role: 'OWNER',
              profileId: bobbyProfile.id,
            },
            {
              profileId: helenProfile.id,
            },
          ],
        },
      },
      conversation: {
        create: {},
      },
    },
  })

  await prisma.activity.create({
    data: {
      title: 'Mysterious mist research',
      workspaceId: workspace.id,
      participants: {
        createMany: {
          data: [
            {
              role: 'OWNER',
              profileId: mistyProfile.id,
            },
            {
              profileId: bobbyProfile.id,
            },
          ],
        },
      },
      conversation: {
        create: {},
      },
      task: {
        create: {
          body: 'A research must be performed... Object of the research: mysterious mist that appeared over the river.',
        },
      },
    },
  })

  await prisma.activity.create({
    data: {
      title: 'Do some stuff',
      workspaceId: workspace.id,
      participants: {
        createMany: {
          data: [
            {
              role: 'OWNER',
              profileId: helenProfile.id,
            },
            {
              profileId: bobbyProfile.id,
            },
          ],
        },
      },
      task: {
        create: {
          body: 'Some stuff description',
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
