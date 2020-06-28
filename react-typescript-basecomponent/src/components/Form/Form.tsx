import * as React from "react"
import FormProps from "./Form.Props"

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
    if (validationFailed) document.body.style.background = "red"
    else {
      const values = []
      formValues.forEach((v) => values.push(v()))
      setformFields(values)
      props.fromProps.submitHandler()
    }

    event.preventDefault()
  }

  const children = props.children as any
  return (
    <form onSubmit={submitHandler}>
      {React.Children.map(children, (child, index) => {
        let props = OverrideProperty(child.props, "pubSub", pubsub)
        OverrideProperty(props, "formValues", formValues)
        return React.cloneElement(child, { ...props })
      })}
      {formFields && <pre>{JSON.stringify(formFields, null, 2)}</pre>}
    </form>
  )
}

export default Form

export function OverrideProperty(
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
