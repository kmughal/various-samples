const fastify = require("fastify")({ logger: false })
const http = require("http").createServer(fastify)
const io = require("socket.io")(http)
const path = require("path")

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
})

fastify.get("/", (req, reply) => {
  reply.sendFile("index.html", "public")
})

const port = process.env.PORT || 3000

function setSocket() {
  const server = io.listen(port)
  let clients = []
  const findClient = (client) => clients.filter((c) => c === client)

  server.on("connection", (client) => {
    const exists = findClient(client).length > 0
    if (exists) return
    clients.push(client)
    console.log("total clients : ", clients.length)
    client.broadcast.emit("new_client", "welcome")

    client.on("make_call", (data) => {
      console.log("in_comming call")
      sendMessage(client, "incoming_call", data)
    })

    client.on("call_answered", (data) => {
      sendMessage(client, "call_answered_done", data)
    })

    client.on("new_ice_candidate", (data) => {
      sendMessage(client, "new_ice_candidate_received", data)
    })

    client.on("disconnect", () => {
      clients = clients.filter((c) => c !== client)
    })

    function sendMessage(_client, _event, _data) {
      console.log({ event: _event, data: _data })
      _client.broadcast.emit(_event, _data)
    }
  })
}

fastify.listen(port).then((str) => {
  console.log(str)
  setSocket()
})
