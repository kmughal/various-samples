interface IValidatorBaseProps {
  formData?: FormData;
  pubSub?: Array<any>;
  formValues?: [() => any];
  name: string;
  frmRef?: HTMLFormElement
}
export default IValidatorBaseProps