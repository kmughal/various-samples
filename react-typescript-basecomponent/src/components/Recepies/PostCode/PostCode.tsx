import * as React from "react"
import PostCodeProps from "./PostCode.Props"
import {
  RegexValidator,
  RegexValidatorProps,
} from "../../Validators/RegexValidator"
import { TextBox, TextBoxProps } from "../../TextBox"
const PostCode: React.FC<{ postCodeProps: PostCodeProps }> = (props) => {
  const postCodeProps = props.postCodeProps
  const regexValidatorProps: RegexValidatorProps = {
    name: postCodeProps.name,
    pubSub: postCodeProps.pubSub,
    regEXPattern: new RegExp(
      "^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))s?[0-9][A-Za-z]{2})$"
    ),
    formValues:postCodeProps.formValues
  }
  const textBoxProps: TextBoxProps = {
    id: postCodeProps.id,
    name: postCodeProps.name,
    label: postCodeProps.label,
    validationError: postCodeProps.validationError,
  }
  return (
    <RegexValidator regexValidatorProps={regexValidatorProps}>
      <TextBox textBoxProps={textBoxProps}></TextBox>
    </RegexValidator>
  )
}

export default PostCode
