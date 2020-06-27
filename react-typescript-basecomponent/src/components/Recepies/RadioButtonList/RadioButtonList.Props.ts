import { RadioButtonProps } from "../../RadioButton"
interface RadioButtonListProps {
  name: string;
  id: string;
  label: string;
  formValues?: [() => any];
  validationError?: string;
  pubSub?: Array<any>;
  radioButtons: Array<RadioButtonProps>
}

export default RadioButtonListProps