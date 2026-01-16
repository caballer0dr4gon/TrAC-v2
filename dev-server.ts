import "dotenv/config";
import "reflect-metadata";

import Fastify from "fastify";
import FastifyCookie from "fastify-cookie";
import mercurius from "mercurius";

import { COOKIE_SECRET, PORT } from "./api/constants";
import { buildContext } from "./api/core/buildContext";
import { schema } from "./api/core/schema";
import { logger } from "./api/services/logger";

async function main() {
  const app = Fastify({ logger, trustProxy: true });

  app.register(FastifyCookie, { secret: COOKIE_SECRET });

  app.register(mercurius, {
    path: "/api/graphql",
    schema,
    context: buildContext,
    ide: true,
  });

  await app.listen(PORT, "0.0.0.0");
  console.log(`API dev server listening on http://localhost:${PORT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
