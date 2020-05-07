import { gql } from "apollo-boost"

const FETCH_PEOPLE_QUERY = gql`
  {
    people {
      name ,
      age
    }
  }
`

const ADD_PERSON_QUERY = gql '

'

export { FETCH_PEOPLE_QUERY }
