import React from "react"

const Counter = ({ name }) => {
    const [counter, setCounter] = React.useState(0)
    return <>
        <h1>{name}</h1>
        <button onClick={_ => setCounter(counter + 1)}>+</button>
        <p>Counter : {counter}</p>
    </>
}

export { Counter }