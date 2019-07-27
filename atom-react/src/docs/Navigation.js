import React from "react";
import PropTypes from "prop-types";

const Navigation = ({ components }) => {
	return (
		<div className="navigation">
			{components.map(name => (
				<div className="navigation-item" key={name}>
					<a href={`#${name}`}>{name}</a>
				</div>
			))}
		</div>
	);
};

Navigation.propTypse = {
	components: PropTypes.array.isRequired
};

export default Navigation;
