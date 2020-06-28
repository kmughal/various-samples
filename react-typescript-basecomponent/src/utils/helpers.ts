import * as React from "react"
import IBaseProps from "../components/IBase.Props"

const setPropsWhenNoValidationRequired = (props: IBaseProps): void => {
  if (props.hasValidator) return
  props.formValues.push(() => {
    let ele = props.eleRef.current
    let value = null
    if (ele.type === "checkbox") {
      value = (ele as HTMLInputElement).checked
    } else {
      value = ele.value
    }
    return { [props.name]: value }
  })
  props.eleRef = React.useRef(null)
  props.valid = true
}

function overrideProperty(
  props: any,
  propertyName: string,
  overrideValue: any
) {
  let { children, ...rest } = props
  for (let i in rest) {
    const item = rest[i]
    let propertyFound = false
    for (let z in item) {
      if (z === propertyName) {
        item[z] = overrideValue
        propertyFound = true
        break
      }
    }
    if (!propertyFound) item[propertyName] = overrideValue
  }
  return { children, ...rest }
}

export { setPropsWhenNoValidationRequired, overrideProperty }