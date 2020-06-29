import * as React from "react"
import MultiFileUploadProps from "./MultiFileUpload.Props"
import { setPropsWhenNoValidationRequired } from "../../../utils/helpers"

const MultiFileUpload: React.FC<{
  multiFileUploadProps: MultiFileUploadProps
}> = (props) => {
  props.multiFileUploadProps.isMultiFileComponent = true
  const multiFileUploadProps = props.multiFileUploadProps
  setPropsWhenNoValidationRequired(props.multiFileUploadProps)
  const resultFileUpload = React.useRef<HTMLElement>(null)
  const style = {
    border: "1px dashed green",
    padding: "5px 5px",
    height: "100px",
    width: "500px",
  }

  const handleDragOver = React.useCallback((e) => {
    e.preventDefault()
  }, [])

  const handleDrop = React.useCallback((e) => {
    e.preventDefault()
    var files = e.dataTransfer.files
    if (files?.length === 0) {
      throw new Error("No file attached")
    }
    multiFileUploadProps.files = multiFileUploadProps.files ?? new FormData()
    Array.from(files).forEach((file: any) => {
      resultFileUpload.current.innerHTML += file.name + "<br/>"
      multiFileUploadProps.files.append("files", file, file.name)
    })
  }, [])

  return (
    <div>
      <div ref={resultFileUpload}></div>
      <label>{multiFileUploadProps.label}</label>
      <div style={style} onDragOver={handleDragOver} onDrop={handleDrop}></div>
    </div>
  )
}

export default MultiFileUpload
