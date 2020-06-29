interface BaseValidatorProps {
  frmRef?: HTMLFormElement
  name: string
  pubSub: Array<any>
  formValues?: [() => any];
  validationFn: (
    eleRef: React.MutableRefObject<any>,
    setValid: React.Dispatch<React.SetStateAction<boolean>>
  ) => boolean
}

export default BaseValidatorProps