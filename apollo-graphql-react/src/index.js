import React from "react"
import { render } from "react-dom"
import { ApolloProvider } from "@apollo/react-hooks"
import client from "./fetch"

import People from "./People"
import PersonEntryForm from "./PeopleEntryForm"

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="p4">
        <h1 className="text-6xl text-center">People details</h1>
        <hr />
        <br/>
        <PersonEntryForm/>
        <br />
        <People />
      </div>
    </ApolloProvider>
  )
}

render(<App />, document.getElementById("app"))
