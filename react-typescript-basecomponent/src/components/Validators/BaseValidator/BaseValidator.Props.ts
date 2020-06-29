import IValidatorBaseProps from "../IVadiatorBase.Props";

interface BaseValidatorProps extends IValidatorBaseProps {

  validationFn: (
    eleRef: React.MutableRefObject<any>,
    setValid: React.Dispatch<React.SetStateAction<boolean>>
  ) => boolean
}

export default BaseValidatorProps