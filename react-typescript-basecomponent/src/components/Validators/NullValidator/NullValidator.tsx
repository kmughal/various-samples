import * as React from "react"
import NullValidatorProps from "./NullValidator.Props"
import { OverrideProperty } from "../../Form/Form"

const NullValidator: React.FC<{ nullValidatorProps: NullValidatorProps }> = (
  props
) => {
  const eleRef = React.useRef(null)
  const [valid, setValid] = React.useState(true)
  const nullValidatorProps = props.nullValidatorProps

  const validation = {
    [`validate${nullValidatorProps.name}`]: () => {
      setValid(eleRef.current.value.length !== 0)
      return eleRef.current.value.length !== 0
    },
  }

  if (
    !nullValidatorProps.pubSub.some(
      (p) => Object.keys(p)[0] === `validate${nullValidatorProps.name}`
    )
  )
    nullValidatorProps.pubSub.push(validation)
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

export default NullValidator
