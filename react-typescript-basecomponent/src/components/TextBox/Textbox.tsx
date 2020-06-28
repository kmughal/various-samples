import * as React from "react"
import TextBoxProps from "./TextBox.Props"
import { setPropsWhenNoValidationRequired } from "../../utils/helpers"

const TextBox: React.FC<{ textBoxProps: TextBoxProps }> = ({
  children,
  textBoxProps,
}) => {
  setPropsWhenNoValidationRequired(textBoxProps)

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {textBoxProps.label}
      </label>
      <input
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name={textBoxProps.name}
        id={textBoxProps.id}
        ref={textBoxProps.eleRef as React.MutableRefObject<HTMLInputElement>}
      />
      {!textBoxProps.valid && (
        <div
          role="alert"
          className="m-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        >
          {textBoxProps.validationError ?? "Not valid number"}{" "}
        </div>
      )}
      {children}
    </div>
  )
}

export default TextBox
