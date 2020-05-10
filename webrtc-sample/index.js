import React from "react"
import { render } from "react-dom"
import io from "socket.io-client"

const socket = io.connect("http://localhost:4000")
let v_test = null

const { RTCPeerConnection, RTCSessionDescription } = window

const servers = null
const peerConnection = new RTCPeerConnection(servers)

socket.on("call-made", (offer) => {
  //peerConnection.setRemoteDescription(new RTCSessionDescription(offer.result))
  peerConnection
    .setRemoteDescription(new RTCSessionDescription(offer.result))
    .then(() => {
      peerConnection.createAnswer().then((answer) => {
        peerConnection
          .setLocalDescription(new RTCSessionDescription(answer))
          .then((answer) => {
            socket.emit("make-answer", {
              answer,
            })
          })
      })

      peerConnection.ontrack = function ({ streams: [stream] }) {
        const remoteVideo = document.getElementById("remote-video")
        if (remoteVideo) {
          remoteVideo.srcObject = stream
        }
      }
      navigator.getUserMedia(
        { video: true, audio: true },
        (stream) => {
          const v = document.getElementById("txt-test").value
         
           
          if (v == 1) {
            document.getElementById("local-video").srcObject = stream
          } else 

          stream
            .getTracks()
            .forEach((track) => peerConnection.addTrack(track, stream))
        },
        (error) => {
          console.warn(error.message)
        }
      )
    })
})

function callUser() {
  peerConnection
    .createOffer()
    .then((offer) => {
      console.log(offer)
      peerConnection.setLocalDescription(new RTCSessionDescription(offer))
      return offer
    })
    .then((result) => {
      console.log(result)
      socket.emit("call-user", {
        result,
        to: 0,
      })
    })
}

socket.on("total_clients", (totalClients) => {
  alert(totalClients)
})
socket.on("greeting", (message) => {
  console.log(message)
})

const openMediaDevices = (videoOutput) =>
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      videoOutput.srcObject = stream
      v_test = stream
    })

const getDevices = () => {
  return navigator.mediaDevices.enumerateDevices()
}

const Alert = ({ message }) => <p>{message}</p>

const Dropdown = ({ list }) => {
  if (!list) return <p>Waiting for the devices</p>
  return (
    <select>
      {list.map((i, k) => (
        <option key={k}>{i.name}</option>
      ))}
    </select>
  )
}

const App = () => {
  const [devices, setDevices] = React.useState(null)
  const [error, setError] = React.useState(false)

  const videoRef = React.useRef(null)

  getDevices()
    .then((data) =>
      setDevices(data.map((d) => ({ name: d.label, type: d.kind, id: d.id })))
    )
    .catch((_) => setError(true))
  if (error) return <Alert />

  return (
    <div className="">
      <button
        className="rounded-lg p-10 bg-yellow-500 m-5"
        onClick={(_) => callUser()}
      >
        Connect
      </button>
      <button
        className="rounded-lg p-10 bg-yellow-500"
        onClick={(_) => openMediaDevices(videoRef.current)}
      >
        Start camera
      </button>
      <h1 className="p-5">A simple webchat</h1>
      <div>
        <label className="text-blue-600">Devices:</label>
        <Dropdown list={devices} />
      </div>
      <div>
        <video
          ref={videoRef}
          width="400"
          height="400"
          autoPlay
          controls={true}
        />
      </div>
    </div>
  )
}

render(<App />, document.getElementById("app"))
