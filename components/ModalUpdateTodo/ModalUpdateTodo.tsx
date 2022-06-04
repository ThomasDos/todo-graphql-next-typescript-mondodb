import { ApolloQueryResult, OperationVariables, useMutation } from '@apollo/client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ITodo } from '../../interfaces/ITodo'
import { UPDATE_TODO } from '../../services/graphql'
import CustomInput from '../CustomInput/CustomInput'

interface IModalUpdateTodoProps {
  todo: ITodo
  showUpdateModal: boolean
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>
  refetchTodos: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

const ModalUpdateTodo = ({ todo, showUpdateModal, setShowUpdateModal, refetchTodos }: IModalUpdateTodoProps) => {
  const [updateTodo, { loading: loadingDeleteTodo }] = useMutation(UPDATE_TODO)
  const [currentTodo, setCurrentTodo] = useState<ITodo>(todo)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)

  const handleChange = (e: any) => {
    const { id: targetId, value } = e.target
    setCurrentTodo({ ...currentTodo, [targetId]: value })
  }

  const handleClose = () => {
    setErrorMessage(null)
    setShowUpdateModal(false)
  }
  const handleSubmit = () => {
    if (!currentTodo.topic || !currentTodo.content) {
      setErrorMessage('Please fill all the fields')
    } else {
      updateTodo({ variables: currentTodo }).then(refetchTodos)
      handleClose()
    }
  }

  return (
    <Modal centered show={showUpdateModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`Edit ${todo.topic}`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='py-2'>
          <CustomInput title='Topic' id='topic' handleChange={handleChange} defaultValue={currentTodo.topic} />
          <CustomInput title='Content' id='content' handleChange={handleChange} defaultValue={currentTodo.content} />
        </div>
        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-center'>
        <Button variant='success' className='px-4 w-100 fs-4' onClick={handleSubmit} disabled={loadingDeleteTodo}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalUpdateTodo
