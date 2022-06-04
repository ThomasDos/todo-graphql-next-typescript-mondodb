import { ApolloQueryResult, OperationVariables, useMutation } from '@apollo/client'
import React, { Dispatch, SetStateAction } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ITodo } from '../../interfaces/ITodo'
import { DELETE_TODO } from '../../services/graphql'

interface IModalDeleteTodoProps {
  todo: ITodo
  showDeleteModal: boolean
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>
  refetchTodos: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

const ModalDeleteTodo = ({
  todo: { id, topic },
  showDeleteModal,
  setShowDeleteModal,
  refetchTodos
}: IModalDeleteTodoProps) => {
  const [deleteTodo, { loading: loadingDeleteTodo }] = useMutation(DELETE_TODO)

  const handleClose = () => {
    setShowDeleteModal(false)
  }
  const handleSubmit = () => {
    deleteTodo({ variables: { id } }).then(refetchTodos)
    handleClose()
  }

  return (
    <Modal centered show={showDeleteModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`Delete ${topic}`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='py-2'>
          <span>Are you sure you want to delete this task ?</span>
        </div>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-center'>
        <Button variant='danger' className='px-4 w-100 fs-4' onClick={handleSubmit} disabled={loadingDeleteTodo}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalDeleteTodo
