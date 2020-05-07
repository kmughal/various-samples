const fastify = require("fastify")({ logger: true })
const { ApolloServer, gql } = require("apollo-server-fastify")

fastify.register(require('fastify-cors'), { 
  // put your options here
})
fastify.register(require("./mongodb").initMongodb)
fastify.register(require("./routes").basicRoutes)

const { typeDefs, resolvers } = require("./grapql-schema")

fastify.addHook("preHandler", (req, rep, done) => {
  fastify.log.info("prehandler")
  done()
})

// Run the server!
const start = async () => {
  try {
    const gplServer = new ApolloServer({ typeDefs, resolvers })
    await fastify.register(gplServer.createHandler()).listen(4000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
