import * as React from "react"
import { render } from "react-dom"
import { Form, FormProps } from "./components/Form"

import {
  NullValidator,
  NullValidatorProps,
} from "./components/Validators/NullValidator"

import {
  RangeValidator,
  RangeValidatorProps,
} from "./components/Validators/RangeValidator"

import { TextBox, TextBoxProps } from "./components/TextBox"

import { PostCode, PostCodeProps } from "./components/Recepies/PostCode"

import { NumberBox, NumberBoxProps } from "./components/NumberBox"

import { Title, TitleProps } from "./components/Recepies/Title"
import { Checkbox, CheckboxProps } from "./components/Checkbox"

const fromProps: FormProps = {
  submitHandler: () => {
    document.body.style.background = "green"
  },
}

const nullValidatorProps: NullValidatorProps = { name: "name", pubSub: null }
const textBoxProps: TextBoxProps = {
  name: "name",
  id: "name",
  label: "Name :",
  validationError: "Please provide name!",
}

const rangeValidatorProps: RangeValidatorProps = {
  id: "age",
  name: "age",
  max: 20,
  min: 5,
}
const numberBoxProps: NumberBoxProps = {
  id: "age",
  name: "age",
  label: "Age :",
  validationError: "Valid range is from 5->20",
}

const postCodeProps: PostCodeProps = {
  name: "postcode",
  id: "postcode",
  validationError: "Invalid postcode",
  label: "Post Code:",
}

const titleProps: TitleProps = { label: "Title:", id: "title", name: "title" }

const checkboxProps: CheckboxProps = {
  id: "married",
  name: "married",
  value: "Married",
  label: "Married :",
}

const App = () => {
  return (
    <section className="container mx-auto">
      <h1 className="text-6xl">Basic Form Example</h1>
      <Form fromProps={fromProps}>
        <Checkbox checkboxProps={checkboxProps} />
        <Title titleProps={titleProps} />
        <NullValidator nullValidatorProps={nullValidatorProps}>
          <TextBox textBoxProps={textBoxProps} />
        </NullValidator>

        <RangeValidator rangeValidatorProps={rangeValidatorProps}>
          <NumberBox numberBoxProps={numberBoxProps} />
        </RangeValidator>
        <PostCode postCodeProps={postCodeProps} />
        <div>
          <button className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </Form>
    </section>
  )
}

render(<App />, document.getElementById("app"))
