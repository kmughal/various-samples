interface NumberBoxProps {
  label: string;
  name: string;
  id: string;
  changeHandler?: KeyboardEvent;
  eleRef?: React.MutableRefObject<HTMLInputElement>;
  valid?: boolean,
  validationError?: string;
  value:string
}

export default NumberBoxProps