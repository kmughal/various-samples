import * as React from "react"
import RangeValidatorProps from "./RangeValidator.Props"
import { BaseValidatorProps, BaseValitor } from "../BaseValidator"

const RangeValidator: React.FC<{ rangeValidatorProps: RangeValidatorProps }> = (
  props
) => {
  const rangeValidatorProps = props.rangeValidatorProps

  const validationFn = (
    eleRef: React.MutableRefObject<any>,
    setValid: React.Dispatch<React.SetStateAction<boolean>>,
    validationMessage: string
  ) => {
    const toInt = +eleRef.current.value
    
    const validExpression =
      rangeValidatorProps.max >= toInt && toInt >= rangeValidatorProps.min
    setValid(validExpression)
    return [validExpression, validationMessage]
  }

  const validatorProps: BaseValidatorProps = {
    name: rangeValidatorProps.name,
    validationFn,
    pubSub: rangeValidatorProps.pubSub,
    formValues: rangeValidatorProps.formValues,
  }

  return (
    <BaseValitor children={props.children} validatorProps={validatorProps} />
  )
}

export default RangeValidator
