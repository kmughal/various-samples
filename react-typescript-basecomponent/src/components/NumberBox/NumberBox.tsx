import * as React from "react"
import NumberBoxProps from "./NumberBox.Props"

const NumberBox: React.FC<{ numberBoxProps: NumberBoxProps }> = ({
  children,
  numberBoxProps,
}) => {
  return (
    <div>
      <label>{numberBoxProps.label}</label>
      <input
        type="number"
        name={numberBoxProps.name}
        id={numberBoxProps.id}
        ref={numberBoxProps.eleRef}
      />
      {!numberBoxProps.valid && <p>{numberBoxProps.validationError ?? "Not valid number" } </p>}
      {children}
    </div>
  )
}

export default NumberBox
