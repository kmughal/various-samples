import React from "react";
import { render } from "react-dom";

const App = () => {
  fetch("https://api.cdnjs.com/libraries/jquery")
    .then((res) => res.json())
    .then(console.log);

  const clickHandler = React.useCallback((e) => {
    navigator.serviceWorker.ready.then((registration) => {
      registration.backgroundFetch.fetch(["https://picsum.photos/200/300"]);
    });
  });
  return <button onClick={clickHandler}>Background Fetch start</button>;
};

render(<App />, document.getElementById("app"));
