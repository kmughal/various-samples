const LiveCam = require("./LiveCam")
const webcam_server = new LiveCam({
  start: function () {
    console.log("WebCam server started!")
  },
})
webcam_server.broadcast()

