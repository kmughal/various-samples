import * as React from "react"
import SingleFileUploadProps from "./SingleFileUpload.Props"
import { setPropsWhenNoValidationRequired } from "../../../utils/helpers"

const SingleFileUpload: React.FC<{
  singleFileUploadProps: SingleFileUploadProps
}> = (props) => {
  const singleFileUploadProps = props.singleFileUploadProps

  setPropsWhenNoValidationRequired(singleFileUploadProps)
  const refAsInputElement = singleFileUploadProps.eleRef as React.MutableRefObject<
    HTMLInputElement
  >

  return (
    <div>
      <label>{singleFileUploadProps.label}</label>
      <input
        type="file"
        ref={refAsInputElement}
        id={singleFileUploadProps.id}
        name={singleFileUploadProps.name}
        accept={singleFileUploadProps.accept}
      />
      {!singleFileUploadProps.valid && (
        <div
          role="alert"
          className="m-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        >
          {singleFileUploadProps.validationError ??
            "Please select a file to upload."}{" "}
        </div>
      )}
    </div>
  )
}

export default SingleFileUpload
