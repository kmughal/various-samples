import * as React from "react"
import SelectBoxProps from "./SelectBox.Props"
import SelectBoxOption from "./SelectBoxOption"
import { setPropsWhenNoValidationRequired } from "../../../utils/helpers"


const SelectBox: React.FC<{ selectBoxProps: SelectBoxProps }> = (props) => {
  const selectBoxProps = props.selectBoxProps

  setPropsWhenNoValidationRequired(selectBoxProps)

  const selectOptions = selectBoxProps.options.map(
    (option: SelectBoxOption, index: number) => (
      <option key={index} value={option.value}>{option.text}</option>
    )
  )
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">{selectBoxProps.label}</label>
      <select
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        ref={selectBoxProps.eleRef}
        name={selectBoxProps.name}
        id={selectBoxProps.id}
      >
        {selectOptions}
      </select>
      {!selectBoxProps.valid && (
        <div role="alert" className="m-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{selectBoxProps.validationError ?? "Select an option"} </div>
      )}
      {props.children}
    </div>
  )
}

export default SelectBox
