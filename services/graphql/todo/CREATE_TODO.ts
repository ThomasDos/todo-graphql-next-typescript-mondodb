import { gql } from '@apollo/client'
export default gql`
  mutation CreateTodo($topic: String!, $content: String!) {
    createTodo(topic: $topic, content: $content) {
      id
      topic
      content
      done
    }
  }
`
