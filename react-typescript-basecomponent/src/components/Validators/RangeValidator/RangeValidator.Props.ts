interface RangeValidatorProps {
  min?: number;
  max?: number;
  pubSub?: Array<any>;
  formValues?: [() => any];
  name: string;
  id: string;
  frmRef?: HTMLFormElement
}


export default RangeValidatorProps