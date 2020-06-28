interface IBaseProps {
  formValues?: [() => any];
  valid?: boolean;
  eleRef?: React.MutableRefObject<HTMLInputElement>;
  name: string;
  label: string;
  validationError?: string;
  hasValidator: false;
  value: string;
  id: string;
}

export default IBaseProps