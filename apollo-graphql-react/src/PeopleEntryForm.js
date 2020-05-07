import React from "react"

const PersonEntryForm = () => {
    const name = React.useRef(null)
    const age = React.useRef(null)
    return <form onSubmit={e => {
        
    }}>
    <div>
        <label>Name</label>
        <input type="text" ref={name}/>
    </div>
    <div>
        <label>Age</label>
        <input type="number" ref={age}/>
    </div>
    <div>
    <input type="submit">Add person</input>
    </div>
    </form>
}

export default PersonEntryForm