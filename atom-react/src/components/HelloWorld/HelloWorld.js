import React from "react";

const HelloWorld = ({ message }) => <p>Hello World {message}</p>;

HelloWorld.propTypes =  {
  message : PropTypes.string
}

export default HelloWorld;