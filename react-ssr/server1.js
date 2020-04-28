
import Express from "express"
import React from "react"
import { renderToString } from "react-dom/server"

import { readFileSync } from "fs"
import path from "path"

import { StaticRouter } from "react-router-dom"
import App from "./src/App"
const app = Express()

app.use(Express.static("dist"))

app.get('/*', (req, res) => {
    const context = {}

    const appInString = renderToString(
        <StaticRouter location={req.url} context={context}>
            <App name="comming from server" isServer={true} />
        </StaticRouter>
    )

    let html = readFileSync(path.resolve(__dirname, "index.html"), { encoding: "utf-8" })
    const pattern = /<div id="app">/gi

    html = html.replace(pattern, `<div id="app">${appInString}`)


    return res.send(
        html
    )
})


const p = 3000
app.listen(p, () => console.log("connected :", p))
