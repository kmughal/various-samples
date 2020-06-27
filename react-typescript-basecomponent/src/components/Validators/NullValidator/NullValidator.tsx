import * as React from "react"
import NullValidatorProps from "./NullValidator.Props"
import { BaseValidatorProps, BaseValitor } from "../BaseValidator"

const NullValidator: React.FC<{ nullValidatorProps: NullValidatorProps }> = (
  props
) => {
  const nullValidatorProps = props.nullValidatorProps

  const validationFn = (
    eleRef: React.MutableRefObject<any>,
    setValid: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    let expression = eleRef.current.value.length !== 0
    if (eleRef.current.type === "checkbox") {
      expression = eleRef.current.checked
    }
    setValid(expression)
    return expression
  }

  const validatorProps: BaseValidatorProps = {
    name: nullValidatorProps.name,
    validationFn,
    pubSub: nullValidatorProps.pubSub,
    formValues: nullValidatorProps.formValues,
  }
  debugger
  return (
    <BaseValitor children={props.children} validatorProps={validatorProps} />
  )
}

export default NullValidator
