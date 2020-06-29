import * as React from "react"
import BaseValidatorProps from "./BaseValidator.Props"
import { overrideProperty } from "../../../utils/helpers"

const BaseValidator: React.FC<{ validatorProps: BaseValidatorProps }> = (
  props
) => {
  const { children, validatorProps } = props

  const eleRef = React.useRef(null)
  const [valid, setValid] = React.useState(true)

  const validation = {
    [`validate${validatorProps.name}`]: () =>
      validatorProps.validationFn(eleRef, setValid),
  }

  if (
    !validatorProps.pubSub.some(
      (p) => Object.keys(p)[0] === `validate${validatorProps.name}`
    )
  ) {
    validatorProps.pubSub.push(validation)
    validatorProps.formValues.push(() => {
      return {
        [validatorProps.name]: eleRef.current.value,
      }
    })
  }

  return (
    <>
      {React.Children.map(children as any, (child, index) => {
        let props = overrideProperty(child.props, "eleRef", eleRef)
        props = overrideProperty(child.props, "valid", valid)
        props = overrideProperty(child.props, "setValid", setValid)
        props = overrideProperty(child.props, "hasValidator", true)
        props = overrideProperty(child.props, "frmRef", validatorProps.frmRef)

        return React.cloneElement(child as any, {
          ...props,
        })
      })}
    </>
  )
}

export default BaseValidator
