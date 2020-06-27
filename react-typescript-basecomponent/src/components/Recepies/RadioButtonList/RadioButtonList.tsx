import * as React from "react"
import { RadioButtonListProps } from "."
import { RadioButton } from "../../RadioButton"

const RadioButtonList: React.FC<{
  radioButtonListProps: RadioButtonListProps
}> = (props) => {
  const radioButtonList = props.radioButtonListProps

  radioButtonList.radioButtons.map((radioButtonProps, index) => {
    return <RadioButton key={index} radioButtonProps={radioButtonProps} />
  })

  return <div>{radioButtonList}</div>
}

export default RadioButtonList
