import * as React from "react"
import CheckboxProps from "./Checkbox.Props"
import { setPropsWhenNoValidationRequired } from "../../../utils/helpers"

const NumberBox: React.FC<{ checkboxProps: CheckboxProps }> = ({
  children,
  checkboxProps,
}) => {
  setPropsWhenNoValidationRequired(checkboxProps)

  return (
    <div className="m-1">
      {checkboxProps.label + " "}
      <input
        type="checkbox"
        id={checkboxProps.id}
        ref={checkboxProps.eleRef as React.MutableRefObject<HTMLInputElement>}
        name={checkboxProps.name}
        value={checkboxProps.value}
      />
      {!checkboxProps.valid && (
        <div
          role="alert"
          className="m-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        >
          {checkboxProps.validationError ?? "Select checkbox"}{" "}
        </div>
      )}
      {children}
    </div>
  )
}

export default NumberBox
