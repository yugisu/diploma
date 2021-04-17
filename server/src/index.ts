import type { Server } from "http";

import { initServer, shutdownServer } from "./server";

const enableGracefulShutdown = (httpServer: Server) => {
  process.on("SIGTERM", async () => {
    console.log("Graceful shutdown...");

    shutdownServer(httpServer);
  });

  process.on("uncaughtException", async (err) => {
    console.error(`Uncaught exception: ${err.stack?.split("\n")}`);

    shutdownServer(httpServer);
  });

  process.on("unhandledRejection", async (err: Error) => {
    console.error(`Unhandled rejection: ${err?.stack?.split("\n")}`);

    shutdownServer(httpServer);
  });
};

const main = async () => {
  try {
    const server = await initServer();

    enableGracefulShutdown(server);
  } catch (error) {
    console.error(error);
  }
};

main();
