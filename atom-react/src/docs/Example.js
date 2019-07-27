import React from "react";
import PropTypes from "prop-types";
import CodeExample from "./CodeExample";

class Example extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showCode: true };
	}

	toggleClass = event => {
		event.preventDefault();
		this.setState(prevState => ({ showCode: !prevState.showCode }));
	};

	render() {
		const { showCode } = this.state;
		const { code, description, name } = this.props.example;

		const ExampleComponent = require(`./examples/${
			this.props.componentName
		}/${name}`).default;

		return (
			<div>
				{description && <h4>{description}</h4>}
				<ExampleComponent />
				<p>
					<a href="#" onClick={this.toggleClass}>
						{showCode ? "Show" : "Hide"}
					</a>
				 {!showCode && <CodeExample>{code}</CodeExample>}
				</p>
			</div>
		);
	}
}

Example.propTypes = {
	example: PropTypes.object.isRequired,
	componentName: PropTypes.string.isRequired
};

export default Example;
