import React from "react"
import { render } from "react-dom"
import io from "socket.io-client"

const ioClient = io.connect("http://localhost:4000")

function mapStreamSourceToCanvas(video, canvasEl) {
  
  const context = canvasEl.getContext("2d")

  context.drawImage(video, 0, 0, 300, 400)
  findColor(context)
  setTimeout(() => mapStreamSourceToCanvas(video,canvasEl), 0)
}

function findColor(context) {
  let frame = context.getImageData(0, 0, 300, 400)
  let data = frame.data.length / 4
  for (let i = 0; i < data; i++) {
    let r = frame.data[i * 4 + 0]
    let g = frame.data[i * 4 + 1]
    let b = frame.data[i * 4 + 2]

    if (b <= 10 || g <= 100) frame.data[i * 4 + 3] = 0
  }
  context.putImageData(frame, 0, 0)
  ioClient.emit("message_from_client" , frame)
}

const App = () => {
  const [counter, setCounter] = React.useState()
  const videoRef = React.useRef(null)
  const canvasRef = React.useRef(null)

  const activateCameraHandler = async (_) => {
    const videoCtl = videoRef.current
    videoCtl.srcObject = await navigator.mediaDevices.getUserMedia({
      video: true,
    })

    videoCtl.addEventListener(
      "loadeddata",
      () => {
        mapStreamSourceToCanvas(videoCtl, canvasRef.current)
      },
      false
    )
  }
  ioClient.on("message", (data) => setCounter(data))

  return (
    <>
      <h1>{counter}</h1>

      <video ref={videoRef} width="300" height="400" controls></video>
      <canvas ref={canvasRef} width="300" height="400"></canvas>
      <button onClick={activateCameraHandler}>Activate Camera</button>
    </>
  )
}

render(<App />, document.getElementById("app"))
