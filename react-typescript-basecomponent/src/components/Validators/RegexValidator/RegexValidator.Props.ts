import IValidatorBaseProps from "../IVadiatorBase.Props";

interface RegexValidatorProps extends IValidatorBaseProps {
  regEXPattern: RegExp;
}

export default RegexValidatorProps
