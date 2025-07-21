const fastify = require("fastify")({ logger: true });
const apiRoutes = require("./api");
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.listen({ port: 3001 }, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
fastify.register(apiRoutes);
