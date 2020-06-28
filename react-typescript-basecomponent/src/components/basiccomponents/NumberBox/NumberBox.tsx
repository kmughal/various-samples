import * as React from "react"
import NumberBoxProps from "./NumberBox.Props"
import { setPropsWhenNoValidationRequired } from "../../../utils/helpers"

const NumberBox: React.FC<{ numberBoxProps: NumberBoxProps }> = ({
  children,
  numberBoxProps,
}) => {
  setPropsWhenNoValidationRequired(numberBoxProps)
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {numberBoxProps.label}
      </label>
      <input
        type="number"
        name={numberBoxProps.name}
        id={numberBoxProps.id}
        ref={numberBoxProps.eleRef}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {!numberBoxProps.valid && (
        <div
          role="alert"
          className="m-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        >
          {numberBoxProps.validationError ?? "Not valid number"}{" "}
        </div>
      )}
      {children}
    </div>
  )
}

export default NumberBox
