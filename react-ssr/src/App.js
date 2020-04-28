import React from "react"
import { hydrate } from "react-dom"
import { Counter } from "./Counter"

// setTimeout(() => hydrate(<Counter name="from client" />, document.getElementById("app")), 3000)

import { BrowserRouter, Route, Switch, Link, Router } from "react-router-dom"
import getHistory from "./history";
function Status({ code, children }) {
    return (
        <Route
            render={({ staticContext }) => {
                if (staticContext) staticContext.status = code;
                return children;
            }}
        />
    );
}

function NotFound() {
    return (
        <Status code={404}>
            <div>
                <h1>Sorry, can’t find that.</h1>
            </div>
        </Status>
    );
}

function App({ name = "from client", isServer = false }) {
    const history = getHistory(isServer)
    return (
        <Router history={history}>
            <div>
                <ul>

                    <li>
                        <a href="/">About</a>
                    </li>
                    <li>
                        <a href="/home">Home</a>
                    </li>
                    <li>
                        <a href="/dashboard">Dashboard</a>

                    </li>
                </ul>

                <hr />
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/home" component={Home} />
                    <Route path="/" component={() => About({ name })} />

                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}
export default App

function About({ name }) {
    return <h1>About {name}</h1>
}

function Dashboard() {
    return <h1>Dashboard</h1>
}
function Home() {
    return <h1>Home</h1>
}