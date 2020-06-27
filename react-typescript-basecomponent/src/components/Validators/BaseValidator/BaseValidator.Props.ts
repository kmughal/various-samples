interface BaseValidatorProps {
  name: string
  pubSub: Array<any>
  validationFn: (
    eleRef: React.MutableRefObject<any>,
    setValid: React.Dispatch<React.SetStateAction<boolean>>
  ) => boolean
}

export default BaseValidatorProps