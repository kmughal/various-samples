interface NumberBoxProps {
  label: string;
  name: string;
  id: string;
  changeHandler?: KeyboardEvent;
  eleRef?: React.MutableRefObject<HTMLInputElement>;
  valid?: boolean,
  validationError?:string
}

export default NumberBoxProps