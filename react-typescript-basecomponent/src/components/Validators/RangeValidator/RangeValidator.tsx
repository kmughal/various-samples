import * as React from "react"
import RangeValidatorProps from "./RangeValidator.Props"
import { OverrideProperty } from "../../Form/Form"

const RangeValidator: React.FC<{ rangeValidatorProps: RangeValidatorProps }> = (
  props
) => {
  const eleRef = React.useRef(null)
  const [valid, setValid] = React.useState(true)
  const rangeValidatorProps = props.rangeValidatorProps

  const validation = {
    [`validate${rangeValidatorProps.name}`]: () => {
      const toInt = +eleRef.current.value
      const validExpression =
        rangeValidatorProps.max >= toInt && toInt >= rangeValidatorProps.min
      setValid(validExpression)
      return validExpression
    },
  }

  if (
    !rangeValidatorProps.pubSub.some(
      (p) => Object.keys(p)[0] === `validate${rangeValidatorProps.name}`
    )
  )
    rangeValidatorProps.pubSub.push(validation)

  const children = props.children as any
  return (
    <>
      {React.Children.map(children, (child, index) => {
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

export default RangeValidator
