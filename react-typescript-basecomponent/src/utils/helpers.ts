import * as React from "react"
import IBaseProps from "../components/IBase.Props"

const setPropsWhenNoValidationRequired = (props: IBaseProps): void => {
  if (props.hasValidator) return
  props.formValues.push(() => ({
    [props.name]: props.eleRef.current.checked,
  }))
  props.eleRef = React.useRef(null)
  props.valid = true


}


export { setPropsWhenNoValidationRequired }