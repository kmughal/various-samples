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

const ADD_NEW_RECORD_TO_LOCAL_STORE = gql`
  mutation AddNewPerson($name :String, $age:Int) {
    addPersonToLocalStore(name : $name, age :$age) @client {
      name 
      age
    }
  }
`

const FIND_ALL_RECORDS_FROM_LOCAL_STORE = gql`
  query fetchAllRecords @client {
    people {
      name 
      age
    }
  }
`

export {
  FETCH_PEOPLE_QUERY,
  ADD_PERSON_MUTATION,
  ADD_NEW_RECORD_TO_LOCAL_STORE,
  FIND_ALL_RECORDS_FROM_LOCAL_STORE
}
