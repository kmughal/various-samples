interface RegexValidatorProps {
  pubSub: Array<any>;
  formValues: [() => any];
  name: string;
  regEXPattern: RegExp;
  frmRef?: HTMLFormElement;
}

export default RegexValidatorProps
