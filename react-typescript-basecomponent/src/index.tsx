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
import {
  SelectBoxOption,
  SelectBoxProps,
  SelectBox,
} from "./components/SelectBox"

const fromProps: FormProps = {
  submitHandler: () => {
    document.body.style.background = "green"
  },
}

const nullValidatorProps: NullValidatorProps = { name: "name" }

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
  id: "terms",
  name: "terms",
  value: "terms",
  label: "Have you read the terms and conditions :",
  validationError: "Please select Terms and Conditions",
}
const nullCheckboxValidatorProps: NullValidatorProps = {
  name: "termsandconditions",
}

const App = () => {
  return (
    <section className="container mx-auto">
      <h1 className="text-6xl">Basic Form Example</h1>
      <Form fromProps={fromProps}>
        <Title titleProps={titleProps} />
        <NullValidator nullValidatorProps={nullValidatorProps}>
          <TextBox textBoxProps={textBoxProps} />
        </NullValidator>

        <RangeValidator rangeValidatorProps={rangeValidatorProps}>
          <NumberBox numberBoxProps={numberBoxProps} />
        </RangeValidator>
        <PostCode postCodeProps={postCodeProps} />

        <NullValidator nullValidatorProps={nullCheckboxValidatorProps}>
          <Checkbox checkboxProps={checkboxProps} />
        </NullValidator>
        <div>
          <button className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </Form>
    </section>
  )
}

const countriesOptions = new Array<SelectBoxOption>()
countriesOptions.push(new SelectBoxOption("", ""))
countriesOptions.push(new SelectBoxOption("United Kingdom", "UK"))
countriesOptions.push(new SelectBoxOption("Pakistan", "Pakistan"))
countriesOptions.push(new SelectBoxOption("United States of America", "USA"))

const selectBoxProps: SelectBoxProps = {
  id: "ddl_countries",
  name: "ddl_countries",
  label: "Country :",
  options: countriesOptions,
  valid: true,
}

const App1 = () => {
  return (
    <section className="container mx-auto">
      <h1 className="text-6xl">Basic Form Example</h1>
      <Form fromProps={fromProps}>
        <Title titleProps={titleProps} />
        <SelectBox selectBoxProps={selectBoxProps} />
        <Checkbox checkboxProps={checkboxProps} />
        <RangeValidator rangeValidatorProps={rangeValidatorProps}>
          <NumberBox numberBoxProps={numberBoxProps} />
        </RangeValidator>
        <div>
          <button className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </Form>
    </section>
  )
}

render(<App1 />, document.getElementById("app"))
