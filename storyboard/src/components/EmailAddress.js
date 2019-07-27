import React from "react";

//https://www.w3resource.com/javascript/form/email-validation.php

const testEmail = email =>
	/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

const validateEmailAddress = e => {
	if (e.keyCode == 13) {
		let result = testEmail(e.target.value);
		if (result) alert("email is valid");
		else alert("email is not valid");
	}
};

import styled from "styled-components";
const Label = styled.label`
	font-size: 16px;
	color: white;
	font-weight: 600;
	padding: 10px 10px;
	margin: 10px 10px;
	display: inline-block;
	background: black;
`;
export const EmailAddress = props => {
	return (
		<>
			<div>
				<Label>{props.label}</Label>
				<input
					type="email"
					required={JSON.parse(props.required || false)}
					onKeyDown={validateEmailAddress}
					value={props.emailaddress}
				/>
			</div>
		</>
	);
};
