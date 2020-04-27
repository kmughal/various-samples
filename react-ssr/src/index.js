import React from "react"
import { hydrate } from "react-dom"
import { Counter } from "./Counter"

setTimeout(() => hydrate(<Counter name="from client" />, document.getElementById("app")), 3000)