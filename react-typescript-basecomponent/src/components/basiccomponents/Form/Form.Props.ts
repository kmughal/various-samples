interface FormProps {
  submitHandler: (formData: FormData) => void;
  formData?: FormData;
  supportOffline?: boolean;
  formWaitingForSubmission?: boolean
}

export default FormProps