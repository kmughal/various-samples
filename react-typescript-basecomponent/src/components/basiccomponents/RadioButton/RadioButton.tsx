import * as React from "react"
import RadioButtonProps, { RadioButtonOption } from "./RadioButton.Props"
import { setPropsWhenNoValidationRequired } from "../../../utils/helpers"

const RadioButtonList = (props) => {
  const { eleRef, radioButtonOptions, name } = props
  const markSelection = (event) => {
    eleRef.current.value = event.target.value
  }
  return radioButtonOptions.map((rd: RadioButtonOption, index: number) => {
    return (
      <div key={index}>
        <input
          type="radio"
          id={`${name}_{index}`}
          name={name}
          value={rd.value}
          onClick={markSelection}
        />
        {"  " + rd.text}
      </div>
    )
  })
}

const RadioButton: React.FC<{ radioButtonProps: RadioButtonProps }> = ({
  children,
  radioButtonProps,
}) => {
  setPropsWhenNoValidationRequired(radioButtonProps)

  const list = radioButtonProps.radioButtonOptions

  return (
    <div>
      <input
        type="hidden"
        id={radioButtonProps.id}
        name={radioButtonProps.name}
        ref={
          radioButtonProps.eleRef as React.MutableRefObject<HTMLInputElement>
        }
      />
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {radioButtonProps.label}
      </label>
      <RadioButtonList
        name={radioButtonProps.name}
        eleRef={radioButtonProps.eleRef}
        radioButtonOptions={radioButtonProps.radioButtonOptions}
      />
      {!radioButtonProps.valid && (
        <div
          role="alert"
          className="m-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        >
          {radioButtonProps.validationError ?? "Select radiobutton"}{" "}
        </div>
      )}
      {children}
    </div>
  )
}

export default RadioButton
