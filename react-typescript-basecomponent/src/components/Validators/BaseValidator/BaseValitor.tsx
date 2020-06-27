import * as React from "react"
import BaseValidatorProps from "./BaseValidator.Props"
import { OverrideProperty } from "../../Form/Form"

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
    debugger
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
        let props = OverrideProperty(child.props, "eleRef", eleRef)
        props = OverrideProperty(child.props, "valid", valid)
        props = OverrideProperty(child.props, "setValid", setValid)

        return React.cloneElement(child as any, {
          ...props,
        })
      })}
    </>
  )
}

export default BaseValidator
