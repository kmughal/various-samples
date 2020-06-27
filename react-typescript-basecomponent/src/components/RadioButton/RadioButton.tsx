import * as React from "react"
import RadioButtonProps from "./RadioButton.Props"

const RadioButton: React.FC<{ radioButtonProps: RadioButtonProps }> = ({
  children,
  radioButtonProps,
}) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">{radioButtonProps.label}</label>
      <input type="radio" id={radioButtonProps.id} 
      name={radioButtonProps.name} value={radioButtonProps.value}/>
      {!radioButtonProps.valid && <div role="alert" className="m-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{radioButtonProps.validationError ?? "Select radiobutton" } </div>}
      {children}
    </div>
  )
}

export default RadioButton
