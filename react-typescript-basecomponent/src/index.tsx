import * as React from "react"
import { render } from "react-dom"

import {
  FormProps,
  TextBoxProps,
  NumberBoxProps,
  CheckboxProps,
  SelectBoxOption,
  SelectBoxProps,
  Form,
  SelectBox,
  NumberBox,
  Checkbox,
  TextBox,
  RadioButton,
  RadioButtonOption,
  RadioButtonProps,
  SingleFileUpload,
  SingleFileUploadProps,
  MultiFileUpload,
  MultiFileUploadProps,
} from "./components/basiccomponents"

import {
  RequiredValidator,
  RequiredValidatorProps,
  RangeValidatorProps,
  RangeValidator,
} from "./components/Validators"

import {
  Title,
  TitleProps,
  PostCode,
  PostCodeProps,
} from "./components/Recepies"

const formProps: FormProps = {
  submitHandler: (formData: FormData) => {
    document.body.style.background = "yellow"
  },
}

const requiredValidatorProps: RequiredValidatorProps = { name: "name" }

const textBoxProps: TextBoxProps = {
  name: "name",
  id: "name",
  label: "Name :",
  validationError: "Please provide name!",
}

const rangeValidatorProps: RangeValidatorProps = {
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

const requiredCheckboxValidatorProps: RequiredValidatorProps = {
  name: "termsandconditions",
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

const marriedCheckboxProps: CheckboxProps = {
  id: "chk_married",
  name: "chk_married",
  value: "Married",
  label: "Are you married :",
}

const radioButtonOptions = new Array<RadioButtonOption>()
radioButtonOptions.push(new RadioButtonOption("Car", "car"))
radioButtonOptions.push(new RadioButtonOption("Walk", "walk"))
radioButtonOptions.push(new RadioButtonOption("Train", "train"))
radioButtonOptions.push(new RadioButtonOption("WFH", "wfh"))

const radioButtonProps: RadioButtonProps = {
  id: "transport_option",
  name: "transport_option",
  label: "How do you travel ?",
  radioButtonOptions: radioButtonOptions,
  validationError: "Please select a valid travel option!",
}

const requiredTravelValidatorProps: RequiredValidatorProps = {
  name: "null_travel_validator",
}

const singleFileUploadProps: SingleFileUploadProps = {
  label: "Document :",
  id: "file_upload",
  name: "file_upload",
  validationError: "Please upload the file as it is required!",
  accept: ".jpeg",
}

const fileUploadRequired: RequiredValidatorProps = {
  name: "single_file_required_upload",
}

const App = () => {
  return (
    <section className="container mx-auto">
      <h1 className="text-6xl">Basic Form Example</h1>
      <Form formProps={formProps}>
        <Title titleProps={titleProps} />

        <RequiredValidator requiredValidatorProps={requiredValidatorProps}>
          <TextBox textBoxProps={textBoxProps} />
        </RequiredValidator>

        <Checkbox checkboxProps={marriedCheckboxProps} />

        <RangeValidator rangeValidatorProps={rangeValidatorProps}>
          <NumberBox numberBoxProps={numberBoxProps} />
        </RangeValidator>

        <SelectBox selectBoxProps={selectBoxProps} />

        <PostCode postCodeProps={postCodeProps} />

        <RequiredValidator
          requiredValidatorProps={requiredTravelValidatorProps}
        >
          <RadioButton radioButtonProps={radioButtonProps} />
        </RequiredValidator>

        <RequiredValidator requiredValidatorProps={fileUploadRequired}>
          <SingleFileUpload singleFileUploadProps={singleFileUploadProps} />
        </RequiredValidator>

        <RequiredValidator
          requiredValidatorProps={requiredCheckboxValidatorProps}
        >
          <Checkbox checkboxProps={checkboxProps} />
        </RequiredValidator>

        <div>
          <button className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </Form>
    </section>
  )
}

const multiFileUploadProps: MultiFileUploadProps = {
  id: "multi-file",
  name: "multi-file",
}
const App1 = () => {
  return (
    <div className="container m-10 p-5">
      <Form formProps={formProps}>
        <Title titleProps={titleProps} />
        <MultiFileUpload multiFileUploadProps={multiFileUploadProps} />
        <div>
          <button className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </Form>
    </div>
  )
}

render(<App />, document.getElementById("app"))
