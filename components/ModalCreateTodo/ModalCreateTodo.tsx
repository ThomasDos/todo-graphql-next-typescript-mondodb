import { ApolloQueryResult, OperationVariables, useMutation } from '@apollo/client'
import { Dispatch, SetStateAction, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { CREATE_TODO } from '../../services/graphql'
import { CustomInput } from '..'
import { ErrorMessage } from './ModalCreateTodo.styled'

interface IModalNewTodoProps {
  showTodoModal: boolean
  setShowTodoModal: Dispatch<SetStateAction<boolean>>
  refetchTodos: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

const ModalCreateTodo = ({ showTodoModal, setShowTodoModal, refetchTodos }: IModalNewTodoProps) => {
  const [newTodo, setNewTodo] = useState({ topic: '', content: '' })
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [createTodo, { loading: loadingCreateTodo }] = useMutation(CREATE_TODO)

  const handleChange = (e: any) => {
    const { id, value } = e.target
    setNewTodo({ ...newTodo, [id]: value })
  }

  const handleClose = () => {
    setErrorMessage(null)
    setShowTodoModal(false)
  }
  const handleSubmit = () => {
    if (!newTodo.topic || !newTodo.content) {
      setErrorMessage('Please fill all the fields')
    } else {
      createTodo({ variables: newTodo }).then(refetchTodos)
      handleClose()
    }
  }

  return (
    <Modal centered show={showTodoModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='py-2'>
          <CustomInput title='Topic' id='topic' handleChange={handleChange} />
          <CustomInput title='Content' id='content' handleChange={handleChange} />
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-center'>
        <Button variant='success' className='px-4 w-100 fs-4' onClick={handleSubmit} disabled={loadingCreateTodo}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalCreateTodo
