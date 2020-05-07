const { getDefaultCollection } = require("./mongodb")

const basicRoutes = async (fastify, option) => {
  fastify.get("/", indexRoute)
  async function indexRoute(request, response) {
    const collection = await getDefaultCollection()
    const result = await collection.find({}).toArray()
    return result
  }

  fastify.get("/add", async (request, response) => {
    const params = request.query
    const collection = await getDefaultCollection()
    await collection.insertOne(params)
    return params
  })
}

module.exports.basicRoutes = basicRoutes
