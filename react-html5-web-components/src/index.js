import * as React from "react";
import { render } from "react-dom";
import SpeackUI from "./SpeakUI"
Array.prototype.first = function() {
	if (this.length === 0) throw new Error("out of index");
	return this[0];
};

var template = document.createElement("template");

template.innerHTML = `
<style>
  .action-button {
    border:1px solid red;
    padding: 10px 10px;
  }
</style>

<div class="container">
  <button class='action-button'>Label</button>
</div>

`;

class Button extends HTMLElement {
	constructor() {
		super();
		this._shadowRoot = this.attachShadow({ mode: "open" });
		this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$button = this._shadowRoot.querySelector(".action-button");
    this.$button.addEventListener('click', this.onClick || function(){})
	}

	attributeChangedCallback(_, __, ___) {
		this.render();
	}

	static get observedAttributes() {
		return ["label"];
	}

	get label() {
		return this.getAttribute("label");
	}

	set label(value) {
		this.setAttribute("label", value);
  }
  
  set onClick(fn) {
    this.$button.addEventListener('click' , fn)
  }

	render() {
		this.$button.innerHTML = this.label;
	}
}

window.customElements.define("my-element", Button);

const App = () => {
	React.useEffect(() => {
		const myElement = Array.from(
			document.getElementsByTagName("my-element")
		).first();
    myElement.label = new Date().toString();
    myElement.onClick = function() {
      alert('show me time')
    }
	});
	return (
		<>
			<my-element label="hello wolrd" />
			<h1>Hello world</h1>
		</>
	);
};

render(<App />, document.getElementById("app"));




render(<SpeackUI/>,document.getElementById("speak-container"))