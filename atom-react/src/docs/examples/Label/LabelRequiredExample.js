import React from "react";
import Label from "ps-react/Label";

/** Label when the value of input box is required */
const RequiredLabelExample = () => (
	<Label isRequired={true} htmlFor="text" text="First name" />
);

export default RequiredLabelExample;
