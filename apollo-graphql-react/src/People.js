import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { FETCH_PEOPLE_QUERY } from "./fetch-actions"

const PleaseWait = () => <p>Loading....</p>

const PeopleRecords = ({ people }) => {
  console.log(people)
  return (
    <table className="table-auto">
      <thead>
        <tr className="bg-gray-100">
          <th className="w-1/4 px-4 py-2">Name</th>
          <th className="w-1/2 px-4 py-2">Age</th>
        </tr>
      </thead>

      <tbody>
        {people.map((p,i) => {
          return (
            <tr key={i}>
              <td className="w-1/4 px-4 py-2">{p.name}</td>
              <td className="w-1/2 px-4 py-2">{p.age}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const FetchFailed = () => <p className="bg-red-600 bg-opacity-75 text-6xl text-color-white">Fetch failed</p>

const People = () => {
  const { loading, error, data } = useQuery(FETCH_PEOPLE_QUERY)

  if (error) return <FetchFailed />
  if (loading) return <PleaseWait />
  return <PeopleRecords people={data.people} />
}

export default People
