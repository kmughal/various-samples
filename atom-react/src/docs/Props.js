import React from "react";
import PropTypes from "prop-types";

const Props = props => {
	return (
		<table className="props">
			<thead>
				<tr>
					<th>Name</th>
					<th>Description</th>
					<th>Default</th>
					<th>Required</th>
				</tr>
			</thead>

			<tbody>
				{Object.keys(props).map(key => {
          return ( <tr key={}>
            <td>{props[key].description}</td>
            <td>{props[key].type.name}</td>
            <td>{props[key].defaultValue && props[key].defaultValue.value}</td>
            <td>{props[key].required || "x"}</td>
          </tr>)
        })}
			</tbody>
		</table>
	);
};

Props.propsTypes = {
  props : PropTypes.object.isRequired
}

export default Props;
