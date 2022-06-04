import { gql } from '@apollo/client'
export default gql`
  mutation UpdateTodo($id: String!, $topic: String, $content: String, $done: Boolean) {
    updateTodo(id: $id, topic: $topic, content: $content, done: $done) {
      id
      topic
      content
      done
    }
  }
`
