import React from "react";
import Label from "ps-react/Label";

/** When the text box value is not required then extra * is not added as part of the label text to indicate user that is not required */
const NotRequiredLabelExample = () => (
	<Label isRequired={false} htmlFor="text" text="Additional information" />
);

export default NotRequiredLabelExample;
