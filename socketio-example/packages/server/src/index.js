const fastify = require("fastify")({ logger: true })
const http = require("http").createServer(fastify)
const path = require("path")
const io = require("socket.io")
const fastifyStatic = require("fastify-static")

// plugins
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
})

fastify.register(require("fastify-cors"), {
  credentials: true,
  origin: "http://localhost:3000",
})

// Routes
fastify.get("/", function (req, reply) {
  reply.sendFile("hello-world.html", "public")
})

const port = process.env.PORT || 4000

async function start() {
  await fastify.listen(port)
  const streamServer = io.listen(port)
  const clients = new Map()

  streamServer.on("connect", (socket) => {
    clients.set(socket, 1)
    socket.on("disconnect", () => {
      clients.delete(socket)
    })
    socket.on("message_from_client", (msg) => {
      console.log(msg)
    })
  })

  setInterval(() => {
    for (const [client, number] of clients.entries()) {
      client.emit("message", number)
      clients.set(client, number + 1)
    }
  }, 4000)
  console.log("connected :", port)
}

start()
