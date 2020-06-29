interface IBaseProps {
  formValues?: [() => any];
  valid?: boolean;
  eleRef?: React.MutableRefObject<HTMLInputElement | HTMLSelectElement>;
  name: string;
  label: string;
  validationError?: string;
  hasValidator?: boolean;
  value?: string;
  id: string;
  frmRef?: HTMLFormElement;
  files?: FormData;
  isMultiFileComponent?: boolean;
  formData?: FormData;
}

export default IBaseProps