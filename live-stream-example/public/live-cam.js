const address = location.href
const socket = io.connect(address)
const cameraButton = document.getElementById("button-switch-on-camera")
let stream = null
cameraButton.addEventListener("click", async (event) => {
  await switchOnCamera()
})

socket.on("new_client", (msg) => {
  console.log(msg)
})

socket.on("new_ice_candidate_received", (data) => {
  if (data)
    peerConnection
      .addIceCandidate(data)
      .then((_) => console.log("new_ice_candidate_received added"))
      .catch((e) => console.log("new_ice_candidate_received error :", e))
})

socket.on("incoming_call", async (msg) => {
  peerConnection.setRemoteDescription(msg)
  const answer = await peerConnection.createAnswer()
  await peerConnection.setLocalDescription(answer)
  console.log(answer)
  sendMessage("call_answered", answer)
})

socket.on("call_answered_done", async (data) => {
  await peerConnection.setRemoteDescription(data)
})

async function switchOnCamera() {
  stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  })
  document.getElementById("local-video").srcObject = stream
}

const makeCallButton = document.getElementById("button-make-call")
makeCallButton.addEventListener("click", handleMakeCall)
let peerConnection = new RTCPeerConnection(null)

function handleMakeCall() {
  const configuration = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  }
  peerConnection = new RTCPeerConnection(configuration)
  window.peerConnection = peerConnection

  peerConnection.ontrack = ({ streams: [stream] }) => {
    document.getElementById("remote-video").srcObject = stream
  }
  peerConnection.addEventListener("icecandidate", (event) => {
    if (event.candidate) sendMessage("new_ice_candidate", event.candidate)
  })

  peerConnection.addEventListener("iceconnectionstatechange", (event) => {
    console.log("ice candiate state changed", event)
  })

  peerConnection.addEventListener("connectionstatechange", (event) => {
    const connectionState = peerConnection.connectionState
    console.log("peer connection state :", connectionState)
    if (connectionState === "connected") {
    }
  })
  if (stream) peerConnection.addStream(stream)
  peerConnection.createOffer().then((offer) => {
    peerConnection
      .setLocalDescription(offer)
      .then((_) => sendMessage("make_call", offer))
  })
}

function sendMessage(event, data) {
  console.log({ event: event, data: data })
  socket.emit(event, data)
}
