import React from "react";
import PropTypes from "prop-types";

const Label = ({ text, isRequired, htmlFor }) => {
	return (
		<label htmlFor={htmlFor}>
			{text} {isRequired && "*"}
		</label>
	);
};

Label.defaultProps = {
	isRequired: false,
	htmlFor: "empty",
	text: "empty string"
};

Label.propTypes = {
	/** Text label */
	text: PropTypes.string.isRequired,
	/** Boolean flag indicating that if the value is required or not */
	isRequired: PropTypes.bool.isRequired,
	/** Name of Id of the control which this label is tied with */
	htmlFor: PropTypes.string.isRequired
};

export default Label;
