import IBaseProps from "../IBase.Props";

interface RadioButtonProps extends IBaseProps {

  changeHandler?: KeyboardEvent;


  radioButtonOptions: Array<RadioButtonOption>
}

export class RadioButtonOption {
  constructor(public text: string, public value: string) {

  }
}

export default RadioButtonProps

//TODO Radio button : complete this
// TODO Also controls without validator should work as well!