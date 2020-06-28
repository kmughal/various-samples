import SelectBoxOption from "./SelectBoxOption"
import IBaseProps from "../IBase.Props"

interface SelectBoxProps extends IBaseProps {
  options: Array<SelectBoxOption>,
}

export default SelectBoxProps