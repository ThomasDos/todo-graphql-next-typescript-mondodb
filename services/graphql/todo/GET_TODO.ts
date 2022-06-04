import { gql } from '@apollo/client'
export default gql`
  query GetTodo($id: String!) {
    getTodo(id: $id) {
      id
      topic
      content
      done
    }
  }
`
