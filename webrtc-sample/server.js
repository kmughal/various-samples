const fastify = require("fastify")({ logger: false })
const http = require("http")
const io = require("socket.io")(http.createServer(fastify))

fastify.register(require("fastify-cors"), {
  credentials: true,
  origin: "http://localhost:1234",
})

const port = 4000

fastify.get("/test", (req, reply) => {
  reply.send("hello world")
})

async function start() {
  await fastify.listen(port)
  console.log("connected:", port)
  const stream = io.listen(port)
  let sockets = []
  stream.on("connection", (socket) => {
    sockets.push({ socket })
    console.log(sockets.length)
    // for (let client of sockets) {
    //   client.emit("total_clients", sockets.size)
    // }
    socket.broadcast.emit("greeting", "a new user has joined")
    socket.on("call-user", function(offer) {
        socket.broadcast.emit("call-made", offer)
    })
    socket.on("disconnect", () => {
      sockets = sockets.filter((a) => a.socket !== socket)
    })
  })
}

start()
