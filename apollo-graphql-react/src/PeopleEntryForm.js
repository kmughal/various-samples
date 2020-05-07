import React from "react"
import { useMutation } from "@apollo/react-hooks"
import { ADD_PERSON_MUTATION } from "./fetch-actions"

const PersonEntryForm = () => {
  const name = React.useRef(null)
  const age = React.useRef(null)
  const [error, setError] = React.useState(false)
  const [AddPersonMutation] = useMutation(ADD_PERSON_MUTATION)
  return (
    <div className="w-full max-w-xs left-align">
      {error && <p>Error has occured {error}</p>}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={(e) => {
          const result = AddPersonMutation({
            variables: {
              name: name.current.value,
              age: parseInt(age.current.value, 10),
            },
          })
          console.log(result)
        }}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ref={name}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="age"
          >
            Age
          </label>
          <input
            type="text"
            ref={age}
            name="age"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value="Add person"
          />
        </div>
      </form>
    </div>
  )
}

export default PersonEntryForm
