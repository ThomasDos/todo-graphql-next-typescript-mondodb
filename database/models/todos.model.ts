import mongoose from 'mongoose'

const { Schema } = mongoose

const TodosSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    done: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const Todo = mongoose.model('Todo', TodosSchema)

export default Todo
