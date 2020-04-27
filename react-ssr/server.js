
import Express from "express"
import React from "react"
import { renderToString } from "react-dom/server"

import { readFileSync } from "fs"
import path from "path"

import { Counter } from "./src/Counter"
const app = Express()

app.use(Express.static("dist"))

app.get('/hello', (req, res) => {

   const appInString = renderToString(<Counter name="from server" />);
   let html = readFileSync(path.resolve(__dirname, "index.html"), { encoding: "utf-8" })
   const pattern = /<div id="app">/gi

   html = html.replace(pattern, `<div id="app">${appInString}`)
   return res.send(
      html
   )
})


const p = 3000
app.listen(p, () => console.log("connected :", p))
