import * as React from "react"
import TextBoxProps from "./TextBox.Props"

const TextBox: React.FC<{ textBoxProps: TextBoxProps }> = ({
  children,
  textBoxProps,
}) => {
  return (
    <div>
      <label>{textBoxProps.label}</label>
      <input type="text" name="name" id="name" ref={textBoxProps.eleRef} />
      {!textBoxProps.valid && <p>{textBoxProps.validationError ?? "Not valid number" } </p>}
      {children}
    </div>
  )
}

export default TextBox
