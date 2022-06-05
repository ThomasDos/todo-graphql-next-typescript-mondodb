import { useMutation, useQuery } from '@apollo/client'
import { mdiCircleEditOutline, mdiDelete } from '@mdi/js'
import Icon from '@mdi/react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { ITodo } from '../../interfaces/ITodo'
import { GET_TODOS, UPDATE_TODO } from '../../services/graphql'
import { ModalDeleteTodo } from '..'
import { ContentContainer, TodoContainer, TodoIcon, TopicContainer } from './Todo.styled'
import { WrapperCursor, ModalUpdateTodo } from '../'

const Todo = (todo: ITodo) => {
  const { topic, content, done, id } = todo
  const [updateTodo] = useMutation(UPDATE_TODO)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const { refetch: refetchTodos } = useQuery(GET_TODOS)
  return (
    <TodoContainer>
      <div>
        <TopicContainer>
          <TodoIcon done={done} />
          <span className='text-capitalize'>{topic}</span>
        </TopicContainer>
        <ContentContainer>{content}</ContentContainer>
      </div>
      <div className='d-flex align-items-center'>
        <Form
          onChange={(e: any) => {
            updateTodo({ variables: { id, done: e.target.checked } })
          }}
        >
          <Form.Check
            checked={done}
            type='switch'
            id='done-todo-switch'
            color='secondary'
            label={done ? 'Good job !' : 'Please check this switch to end the task'}
          />
        </Form>
        <WrapperCursor onClick={() => setShowDeleteModal(true)}>
          <Icon path={mdiDelete} style={{ color: 'red' }} size={1.5} className='mx-2' />
        </WrapperCursor>
        <WrapperCursor onClick={() => setShowUpdateModal(true)}>
          <Icon path={mdiCircleEditOutline} style={{ color: 'grey' }} size={1.5} className='mx-2' />
        </WrapperCursor>
      </div>
      <ModalDeleteTodo
        refetchTodos={refetchTodos}
        todo={todo}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
      <ModalUpdateTodo
        refetchTodos={refetchTodos}
        todo={todo}
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
      />
    </TodoContainer>
  )
}

export default Todo
