import IValidatorBaseProps from "../IVadiatorBase.Props";

interface BaseValidatorProps extends IValidatorBaseProps {

  validationFn: (
    eleRef: React.MutableRefObject<any>,
    setValid: React.Dispatch<React.SetStateAction<boolean>>,
    validationMessage: string
  ) => boolean
}

export default BaseValidatorProps