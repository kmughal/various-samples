interface FormProps {
  submitHandler: (formData: FormData) => void;
  formData?: FormData;
  supportOffline?: boolean;
  formWaitingForSubmission?: boolean;
  showValidationSummary?: boolean
}

export default FormProps