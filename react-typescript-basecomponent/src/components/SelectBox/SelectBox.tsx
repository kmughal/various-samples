import * as React from "react"
import SelectBoxProps from "./SelectBox.Props"
import SelectBoxOption from "./SelectBoxOption"

const SelectBox: React.FC<{ selectBoxProps: SelectBoxProps }> = (props) => {
  const selectBoxProps = props.selectBoxProps

  const selectOptions = selectBoxProps.options.map(
    (option: SelectBoxOption, index: number) => (
      <option key={index} value={option.value}>{option.text}</option>
    )
  )
  return (
    <div>
      <label>{selectBoxProps.label}</label>
      <select
        ref={selectBoxProps.eleRef}
        name={selectBoxProps.name}
        id={selectBoxProps.id}
      >
        {selectOptions}
      </select>
      {!selectBoxProps.valid && (
        <p>{selectBoxProps.validationError ?? "Select an option"} </p>
      )}
      {props.children}
    </div>
  )
}

export default SelectBox
