import React from "react";
import PropTypes from "prop-types";

/** Simple Hello world component */
const inlineStyle = {
	background: "#dfd7d9",
	/* border: 4px dashed blue; */
	border: "1px solid #ccc",
	padding: " 50px 50px"
};

const HelloWorld = ({ message }) => (
	<p style={inlineStyle}>{message}</p>
);

HelloWorld.propTypes = {
	/** 
    Message to display
   */
	message: PropTypes.string
};

HelloWorld.defaultProps = {
	message: "hello world"
};

export default HelloWorld;
