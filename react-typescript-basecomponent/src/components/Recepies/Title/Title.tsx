import * as React from "react"
import { TitleProps } from "."
import {
  RequiredValidatorProps,
  RequiredValidator,
} from "../../validators/RequiredValidator"
import {
  SelectBoxOption,
  SelectBoxProps,
  SelectBox,
} from "../../basiccomponents"

const Title: React.FC<{ titleProps: TitleProps }> = (props) => {
  const selectBoxValidatorProps: RequiredValidatorProps = {
    name: props.titleProps.name,
    pubSub: props.titleProps.pubSub,
    formValues: props.titleProps.formValues,
  }

  const titles = new Array<SelectBoxOption>()
  titles.push(new SelectBoxOption("", ""))
  titles.push(new SelectBoxOption("Mr", "mr"))
  titles.push(new SelectBoxOption("Mrs", "mrs"))
  titles.push(new SelectBoxOption("Miss", "miss"))
  titles.push(new SelectBoxOption("Dr.", "dr."))

  const selectBoxProps: SelectBoxProps = {
    id: props.titleProps.id,
    name: props.titleProps.name,
    label: props.titleProps.label,
    options: titles,
    validationError: "Select title !",
  }

  return (
    <RequiredValidator requiredValidatorProps={selectBoxValidatorProps}>
      <SelectBox selectBoxProps={selectBoxProps} />
    </RequiredValidator>
  )
}

export default Title
