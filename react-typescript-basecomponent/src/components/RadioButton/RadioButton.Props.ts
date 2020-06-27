interface RadioButtonProps {
  label: string;
  name: string;
  id: string;
  changeHandler?: KeyboardEvent;
  eleRef?: React.MutableRefObject<HTMLInputElement>;
  valid?: boolean,
  validationError?: string;
  value: string;
  radioButtonOptions: [RadioButtonOption]
}

class RadioButtonOption {
  constructor(public text: string, public value: string) {

  }
}

export default RadioButtonProps

//TODO Need to finish this
// TODO Also controls without validator should work as well!