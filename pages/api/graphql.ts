import './../../database/config/config'
import { Resolvers } from '@apollo/client'
import { createServer } from '@graphql-yoga/node'
import Todo from '../../database/models/todos.model'

const typeDefs = `
# Todos
type Todo {
  id: ID
  topic: String
  content: String
  done: Boolean
}

  type Query {
    getTodo(id: ID!): Todo
    getTodos: [Todo]
  }

  type Mutation {
    createTodo(topic: String, content: String): Todo!
    updateTodo(id: String!, topic: String, content: String, done: Boolean): Todo
    deleteTodo(id: String!): Boolean
    deleteTodos: Boolean
  }
`

const resolvers: Resolvers = {
  Query: {
    async getTodos() {
      const todos = await Todo.find()
      return todos ?? []
    },
    async getTodo(_, { id }) {
      const todo = await Todo.findById(id)
      return todo
    }
  },
  Mutation: {
    async createTodo(_, args) {
      const { topic, content } = args
      if (!topic || !content) return { error: 'Missing data' }
      const todo = new Todo({ topic, content })
      try {
        await todo.save()
        return todo
      } catch (error) {
        return error
      }
    },
    async updateTodo(_, args) {
      const { id, ...fieldsToUpdate } = args

      const todo = await Todo.findOneAndUpdate({ _id: id }, fieldsToUpdate, {
        new: true
      })

      return todo
    },
    async deleteTodo(_, { id }) {
      const todoDeleted = await Todo.findOneAndDelete({ _id: id })
      return !!todoDeleted
    },
    async deleteTodos() {
      const todosDeleted = await Todo.deleteMany()
      return !!todosDeleted
    }
  }
}

const server = createServer({
  schema: {
    typeDefs,
    resolvers
  },
  endpoint: '/api/graphql'
})

export default server
