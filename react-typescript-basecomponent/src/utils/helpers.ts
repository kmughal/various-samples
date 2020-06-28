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


export { setPropsWhenNoValidationRequired }