interface PostCodeProps {
  name: string;
  id: string;
  label: string;
  formValues?: [() => any];;
  validationError?: string;
  pubSub?: Array<any>;
  
}

export default PostCodeProps