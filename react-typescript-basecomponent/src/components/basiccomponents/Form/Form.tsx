import * as React from "react"
import FormProps from "./Form.Props"
import { overrideProperty, JsonToString } from "../../../utils/helpers"

const flatList = (arr: Array<any>) => {
  return arr.reduce((prev, current) => {
    prev.push(current[Object.keys(current)[0]])
    return prev
  }, [])
}

const runValidation = (arr: Array<any>) => {
  const result = new Array<boolean>()
  arr.forEach((i) => result.push(i()))
  return result.some((c) => !c)
}

const Form: React.FC<{ formProps: FormProps }> = (props) => {
  const pubsub = []
  const formValues = []
  const [formFields, setformFields] = React.useState(null)
  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    setformFields(null)
    let validationFailed: boolean = false

    // there are not validators!
    if (pubsub.length) {
      const flatListOfPubSub = flatList(pubsub)
      validationFailed = runValidation(flatListOfPubSub)
    }
    if (validationFailed) document.body.style.background = "pink"
    else {
      const values = []
      formValues.forEach((v) => values.push(v()))
      setformFields(values)
      props.formProps.submitHandler(props.formProps.formData)
    }
    event.preventDefault()
  }
  const frmRef = React.useRef(null)
  const children = props.children as any
  console.log(formFields)
  props.formProps.formData = props.formProps.formData ?? new FormData()
  return (
    <form onSubmit={submitHandler} ref={frmRef}>
      {React.Children.map(children, (child, index) => {
        let _props = overrideProperty(child.props, "pubSub", pubsub)
        overrideProperty(_props, "formValues", formValues)
        overrideProperty(_props, "frmRef", frmRef)
        overrideProperty(_props, "formData", props.formProps.formData)
        return React.cloneElement(child, { ..._props })
      })}
      {formFields && <pre>{JsonToString(formFields)}</pre>}
    </form>
  )
}

export default Form
