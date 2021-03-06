import * as React from "react"
import RegexValidatorProps from "./RegexValidator.Props"

import { BaseValidatorProps, BaseValitor } from "../BaseValidator"

const RegexValidator: React.FC<{ regexValidatorProps: RegexValidatorProps }> = (
  props
) => {
  const regexValidatorProps = props.regexValidatorProps

  const validationFn = (
    eleRef: React.MutableRefObject<any>,
    setValid: React.Dispatch<React.SetStateAction<boolean>>,
    validationMessage: string
  ) => {
    const regExResult = regexValidatorProps.regEXPattern.test(
      eleRef.current.value
    )
    setValid(regExResult)
    return [regExResult, validationMessage]
  }

  const validatorProps: BaseValidatorProps = {
    name: regexValidatorProps.name,
    validationFn,
    pubSub: regexValidatorProps.pubSub,
    formValues: regexValidatorProps.formValues,
  }

  return (
    <BaseValitor children={props.children} validatorProps={validatorProps} />
  )
}

export default RegexValidator
