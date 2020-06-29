import * as React from "react"
import FormProps from "./Form.Props"
import { overrideProperty, JsonToString } from "../../../utils/helpers"

const flatList = (arr: Array<any>) => {
  return arr.reduce((prev, current) => {
    prev.push(current[Object.keys(current)[0]])
    return prev
  }, [])
}

const runValidation = (arr: Array<any>) => {
  const result = new Array<boolean>()
  arr.forEach((i) => result.push(i()))
  return result.some((c) => !c)
}

const AlertMessage = (_) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong className="font-bold">Holy smokes no internet!</strong>
    <span className="block sm:inline">
      Dont worry once we are online we will send your application. Dont close
      this window!
    </span>
    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
      <svg
        className="fill-current h-6 w-6 text-red-500"
        role="button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <title>Close</title>
        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
      </svg>
    </span>
  </div>
)

const Form: React.FC<{ formProps: FormProps }> = (props) => {
  const pubsub = []
  const formValues = []
  const [formFields, setformFields] = React.useState(null)
  const [online, setOnline] = React.useState(navigator.onLine)

  const submitForm = () => {
    const isFormComplted = props.formProps.formWaitingForSubmission
    if (isFormComplted) {
      if(online && props.formProps.supportOffline) alert("internet is back we are sending your form...")
      document.body.style.background = "white"
      props.formProps.submitHandler(props.formProps.formData)
    }
  }

  const performFormSubmission = () => {
    const supportOffline = props.formProps.supportOffline
    props.formProps.formWaitingForSubmission = true
    if (!supportOffline) {
      submitForm()
      return
    }

    if (online) {
      submitForm()
    } else {
      alert(
        "no internet but don't worry we save your application once internet is back it will be send automatically"
      )
      document.body.style.background = "gray"
    }
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    setformFields(null)
    let validationFailed: boolean = false

    // there are not validators!
    if (pubsub.length) {
      const flatListOfPubSub = flatList(pubsub)
      validationFailed = runValidation(flatListOfPubSub)
    }
    if (validationFailed) document.body.style.background = "pink"
    else {
      const values = []
      formValues.forEach((v) => values.push(v()))
      setformFields(values)
      performFormSubmission()
    }
    event.preventDefault()
  }
  const frmRef = React.useRef(null)
  const children = props.children as any
  console.log(formFields)
  props.formProps.formData = props.formProps.formData ?? new FormData()

  window.addEventListener("online", () => {
    setOnline(true)
    submitForm()
  })
  window.addEventListener("offline", () => setOnline(false))

  return (
    <>
      {props.formProps.supportOffline && !online && <AlertMessage />}
      <form onSubmit={submitHandler} ref={frmRef}>
        {React.Children.map(children, (child, index) => {
          let _props = overrideProperty(child.props, "pubSub", pubsub)
          overrideProperty(_props, "formValues", formValues)
          overrideProperty(_props, "frmRef", frmRef)
          overrideProperty(_props, "formData", props.formProps.formData)
          return React.cloneElement(child, { ..._props })
        })}
        {formFields && <pre>{JsonToString(formFields)}</pre>}
      </form>
    </>
  )
}

export default Form
