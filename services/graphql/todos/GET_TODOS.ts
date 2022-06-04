import { gql } from '@apollo/client'
export default gql`
  query getTodos {
    getTodos {
      id
      topic
      content
      done
    }
  }
`
