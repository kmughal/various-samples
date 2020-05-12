import React from "react"
import { render } from "react-dom"
import { ApolloProvider, useQuery } from "@apollo/react-hooks"
import client from "./fetch"

import People from "./People"

const App = () => {
  return (
    <ApolloProvider client={client}>
      <React.StrictMode>
        <div className="p4">
          <h1 className="text-6xl text-center">People details</h1>
          <hr />
          <br />

          <br />
          <People />
        </div>
      </React.StrictMode>
    </ApolloProvider>
  )
}

render(<App />, document.getElementById("app"))
