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

const Form: React.FC<{ fromProps: FormProps }> = (props) => {
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
      props.fromProps.submitHandler()
    }

    event.preventDefault()
  }
  const frmRef = React.useRef(null)
  const children = props.children as any
  console.log(formFields)
  return (
    <form onSubmit={submitHandler} ref={frmRef}>
      {React.Children.map(children, (child, index) => {
        let props = overrideProperty(child.props, "pubSub", pubsub)
        overrideProperty(props, "formValues", formValues)
        overrideProperty(props, "frmRef", frmRef)
        return React.cloneElement(child, { ...props })
      })}
      {formFields && <pre>{JsonToString(formFields)}</pre>}
    </form>
  )
}

export default Form
