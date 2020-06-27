import * as React from "react"
import { render } from "react-dom"
import Form from "./components/Form/Form"
import FormProps from "./components/Form/Form.Props"

import NullValidator from "./components/Validators/NullValidator/NullValidator"
import NullValidatorProps from "./components/Validators/NullValidator/NullValidator.Props"

import TextBox from "./components/TextBox/Textbox"
import TextBoxProps from "./components/TextBox/TextBox.Props"

import {
  RangeValidator,
  RangeValidatorProps,
} from "./components/Validators/RangeValidator"

import NumberBox from "./components/NumberBox/NumberBox"
import NumberBoxProps from "./components/NumberBox/NumberBox.Props"

const fromProps: FormProps = {
  submitHandler: () => {
    document.body.style.background = "green"
  },
}

const nullValidatorProps: NullValidatorProps = { name: "name", pubSub: null }
const textBoxProps: TextBoxProps = { name: "name", id: "name", label: "Name :" ,validationError: "Please provide name!"}

const rangeValidatorProps: RangeValidatorProps = { id: "age", name: "age", max: 20, min: 5}
const numberBoxProps:NumberBoxProps = {id:"age" , name:"age" , label: "Age :" , validationError:"Valid range is from 5->20"}

const App = () => {
  return (
    <Form fromProps={fromProps}>
      <NullValidator nullValidatorProps={nullValidatorProps}>
        <TextBox textBoxProps={textBoxProps} />
      </NullValidator>
      <RangeValidator rangeValidatorProps={rangeValidatorProps}>
        <NumberBox numberBoxProps={numberBoxProps}/>
      </RangeValidator>
      <div>
        <button>Submit</button>
      </div>
    </Form>
  )
}

render(<App />, document.getElementById("app"))
