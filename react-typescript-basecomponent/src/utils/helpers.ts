import * as React from "react"
import IBaseProps from "../components/IBase.Props"

const setPropsWhenNoValidationRequired = (props: IBaseProps): void => {
  if (props.hasValidator) return
  props.formValues.push(() => {

    if (props.isMultiFileComponent) {
      const collection = []
      const files = props.files
       
      
      debugger
      for (let i of files.getAll("files")) {
        debugger
        collection.push(i)
      }
      return { [props.name]: collection }
    }

    let ele = props.eleRef.current
    let value = null
    if (ele.type === "checkbox") {
      value = (ele as HTMLInputElement).checked
    }
    else if (ele.type === "file") {
      const files = (ele as HTMLInputElement).files;
      if (files?.length === 0) {
        value = null
        return;
      }
      value = files[0]
    }
    else {
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


const JsonToString = obj => JSON.stringify(obj, (a, b) => {
  return (b instanceof File) ? {
    name: b.name,
    size: b.size,
    type: b.type
  } : b;
}, 2)

export { setPropsWhenNoValidationRequired, overrideProperty, JsonToString }