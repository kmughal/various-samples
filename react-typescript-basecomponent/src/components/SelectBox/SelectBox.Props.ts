import SelectBoxOption from "./SelectBoxOption"

interface SelectBoxProps {
  options: Array<SelectBoxOption>,
  name: string;
  id: string;
  eleRef?: React.MutableRefObject<HTMLSelectElement>;
  valid?: boolean;
  validationError?: string;
  label: string;
}

export default SelectBoxProps