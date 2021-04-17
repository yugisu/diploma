import Koa from "koa";
import { promisify } from "util";
import type { Server } from "http";

import { PrismaClient } from "@prisma/client";

import { getGreeting } from "utils/greeting";

const prisma = new PrismaClient();

export const shutdownServer = (server: Server) => {
  promisify(server.close)();

  prisma.$disconnect();
};

export const initServer = async () => {
  const app = new Koa();

  await prisma.$connect();

  app.use(async (ctx) => {
    ctx.body = getGreeting();
  });

  const server = app.listen({ port: 3000 }, () => {
    console.log("Server listening on localhost:3000...");
  });

  return server;
};
