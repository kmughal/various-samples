import * as React from "react"
import RequiredValidatorProps from "./RequiredValidator.Props"
import { BaseValidatorProps, BaseValitor } from "../BaseValidator"

const RequiredValidator: React.FC<{ requiredValidatorProps: RequiredValidatorProps }> = (
  props
) => {
  const requiredValidatorProps = props.requiredValidatorProps

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
    name: requiredValidatorProps.name,
    validationFn,
    pubSub: requiredValidatorProps.pubSub,
    formValues: requiredValidatorProps.formValues,
  }
  
  return (
    <BaseValitor children={props.children} validatorProps={validatorProps} />
  )
}

export default RequiredValidator
