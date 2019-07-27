import { configure } from "@storybook/react";

const req = require.context("../src/stories", true, /\.stories\.js$/);

function loadStories() {
	//require("../stories/index.js");
	req.keys().forEach(fileName => req(fileName));
}

configure(loadStories, module);
