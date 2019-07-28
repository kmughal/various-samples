import React from "react";
import { storiesOf } from "@storybook/react";
import { Button } from "@storybook/react/demo";
import { SimpleMessage } from "../components/SimpleMessage";

storiesOf("Button", module)
	.add("with text", () => <Button>Hello world</Button>)
	.add("with emoji", () => (
		<Button>
			<span role="img" aria-label="so cool">
				😀 😎 👍 💯
			</span>
		</Button>
	));

storiesOf("SImpleMessage", module).add("with date and time", () => (
	<SimpleMessage message={new Date().toUTCString()} />
));

import { EmailAddress } from "../components/EmailAddress";

storiesOf("Email Address Box", module)
	.add("with label", () => (
		<EmailAddress label="Email address:" value="kmughal@gmail.com" />
	))
	.add("with required", () => (
		<EmailAddress
			label="Email address:"
			value="kmughal@gmail.com"
			required="true"
		/>
	));
