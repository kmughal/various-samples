import React from "react";
import PropTypes from "prop-types";

/** Progress bar component! */
class ProgressBar extends React.Component {
	getColor = percentage => {
		if (percentage === 100) return "darkgreen";
		return percentage > 50 ? "lightgreen" : "red";
	};

	getWidthAsPercentInTotalWidth = () =>
		parseInt(this.props.width * (this.props.percent / 100), 10);

	render() {
		const { percent, width, height } = this.props;
		return (
			<div style={{ border: "1px solid lightgray", width: width }}>
				<div
					style={{
						width: this.getWidthAsPercentInTotalWidth(),
						height,
						background: this.getColor(percent)
					}}
				/>
			</div>
		);
	}
}

ProgressBar.propTypes = {
	/** Width of the progress bard */
	width: PropTypes.number.isRequired,
	/** Height of the progress bard */
	height: PropTypes.number.isRequired,
	/** Percent of the progress bard */
	percent: PropTypes.number.isRequired
};

ProgressBar.defaultProps = {
	width: 300,
	height: 50,
	percent: 66
};

export default ProgressBar;
