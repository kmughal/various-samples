import * as React from "react"
import CheckboxProps from "./Checkbox.Props"

const NumberBox: React.FC<{ checkboxProps: CheckboxProps }> = ({
  children,
  checkboxProps,
}) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">{checkboxProps.label}</label>
      <input type="checkbox" id={checkboxProps.id} 
      name={checkboxProps.name} value={checkboxProps.value}/>
      {!checkboxProps.valid && <div role="alert" className="m-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{checkboxProps.validationError ?? "Select checkbox" } </div>}
      {children}
    </div>
  )
}

export default NumberBox
