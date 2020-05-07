import { gql } from "apollo-boost"

const FETCH_PEOPLE_QUERY = gql`
  {
    people {
      name ,
      age
    }
  }
`

export { FETCH_PEOPLE_QUERY }
