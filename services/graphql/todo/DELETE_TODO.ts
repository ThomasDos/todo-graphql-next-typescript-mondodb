import { gql } from '@apollo/client'
export default gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id)
  }
`
