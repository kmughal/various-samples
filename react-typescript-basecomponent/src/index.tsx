import * as React from "react"
import { render } from "react-dom"

const TextBox = (props) => {
  return (
    <div>
      <label>{props.text}</label>
      <input type="text" name="name" id="name" ref={props.eleRef} />
      {!props.valid && <p>Something wrong here</p>}
      {props.children}
    </div>
  )
}

const NumberBox = (props) => {
  return (
    <div>
      <label>{props.text}</label>
      <input type="text" name="name" id="name" ref={props.eleRef} />
      {!props.valid && <p>Not Valid Range ok</p>}
    </div>
  )
}

function RangeValidation(props) {
  const eleRef = React.useRef(null)
  const [valid, setValid] = React.useState(true)
  const max = +props.max
  const min = +props.min

  const validation = {
    [`validate${props.name}`]: () => {
      const toInt = +eleRef.current.value
      const validExpression = max >= toInt && toInt <= min
      setValid(validExpression)
      return validExpression
    },
  }

  if (!props.pubsub.some((p) => Object.keys(p)[0] === `validate${props.name}`))
    props.pubsub.push(validation)

  return (
    <>
      {React.Children.map(props.children, (child, index) => {
        return React.cloneElement(child, {
          eleRef,
          valid,
          setValid,
          name: props.name,
          id: props.id,
          text: props.text,
          ...child.props,
        })
      })}
    </>
  )
}

function EmptyStringValidation(props) {
  const eleRef = React.useRef(null)
  const [valid, setValid] = React.useState(true)

  const validation = {
    [`validate${props.name}`]: () => {
      setValid(eleRef.current.value.length !== 0)
      return eleRef.current.value.length !== 0
    },
  }

  if (!props.pubsub.some((p) => Object.keys(p)[0] === `validate${props.name}`))
    props.pubsub.push(validation)

  return (
    <>
      {React.Children.map(props.children, (child, index) => {
        return React.cloneElement(child, {
          eleRef,
          valid,
          setValid,
          name: props.name,
          id: props.id,
          text: props.text,
          ...child.props,
        })
      })}
    </>
  )
}

const pubsub = []
const FormExample = (props) => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    const validationResult = []
    const flatList = pubsub.reduce((prev, current) => {
      prev.push(current[Object.keys(current)[0]])
      return prev
    }, [])
    flatList.forEach((i) => validationResult.push(i()))

    const re = validationResult.some((c) => !c)
    if (re) alert("something not correct")
    event.preventDefault()
  }

  return (
    <form onSubmit={submitHandler}>
      {React.Children.map(props.children, (child, index) => {
        return React.cloneElement(child, { pubsub, ...child.props })
      })}
    </form>
  )
}

const App = (_) => {
  return (
    <FormExample>
      <EmptyStringValidation text="Name" name="name" id="name">
        <TextBox />
      </EmptyStringValidation>
      <RangeValidation max="20" min="5" text="Age" name="age" id="age">
        <NumberBox />
      </RangeValidation>
      <div>
        <button>Submit</button>
      </div>
    </FormExample>
  )
}

render(<App />, document.getElementById("app"))
