import { gql } from "apollo-boost"

const FETCH_PEOPLE_QUERY = gql`
  {
    people {
      name
      age
    }
  }
`

const ADD_PERSON_MUTATION = gql`
  mutation AddNewPerson($name: String, $age: Int) {
    createPerson(name: $name, age: $age) {
      name
      age
    }
  }
`

export { FETCH_PEOPLE_QUERY, ADD_PERSON_MUTATION }
