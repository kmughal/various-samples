import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App.js";
import React from "react";

setTimeout(() => {
    ReactDOM.hydrate(
        <BrowserRouter>
          <App name="Client routes have loaded"/>
        </BrowserRouter>,
        document.getElementById("app")
      )
},3000)


// ReactDOM.render(
//   <BrowserRouter>
//     <App name="Client routes have loaded"/>
//   </BrowserRouter>,
//   document.getElementById("app")
//)