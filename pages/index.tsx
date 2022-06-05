import { useMutation, useQuery } from '@apollo/client'
import { mdiDeleteCircle, mdiPlusCircle } from '@mdi/js'
import Icon from '@mdi/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { ModalCreateTodo, Todo } from '../components'
import { ITodo } from '../interfaces/ITodo'
import { GET_TODOS, DELETE_TODOS } from '../services/graphql'
import {
  ButtonsContainer,
  EmptyListTitle,
  HomeContainer,
  SectionsContainer,
  SectionTitle,
  SectionTitleContainer,
  SpanButton
} from '../components/Home/Home.styled'

const Home: NextPage = () => {
  const [showTodoModal, setShowTodoModal] = useState<boolean>(false)
  const { data: todos, loading: loadingTodos, refetch: refetchTodos } = useQuery(GET_TODOS)
  const [deleteTodos] = useMutation(DELETE_TODOS)

  return (
    <HomeContainer>
      <Head>
        <title>Beta Gouv - Todo List</title>
        <meta name='description' content='Todo List app for the technical test with Next.Js / GraphQL / Typescript' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container className='d-flex flex-column align-items-center px-4'>
        {loadingTodos ? (
          <div className='spinner-border text-secondary m-5' role='status' />
        ) : (
          <>
            <>
              {todos?.getTodos.length ? (
                <SectionsContainer>
                  <SectionTitleContainer>
                    <SectionTitle>TO DO</SectionTitle>
                  </SectionTitleContainer>

                  {todos.getTodos
                    .filter((todo: ITodo) => !todo.done)
                    .map((todo: ITodo) => {
                      return <Todo key={todo.id} {...todo} />
                    })}
                  <SectionTitleContainer>
                    <SectionTitle>DONE</SectionTitle>
                  </SectionTitleContainer>
                  {todos.getTodos
                    .filter((todo: ITodo) => todo.done)
                    .map((todo: ITodo) => {
                      return <Todo key={todo.id} {...todo} />
                    })}
                </SectionsContainer>
              ) : (
                <EmptyListTitle className='mb-4'>Please Add a new task</EmptyListTitle>
              )}
            </>
            <ButtonsContainer className='d-flex flex-column flex-md-row'>
              <Button
                onClick={() => setShowTodoModal(true)}
                className='d-flex align-items-center justify-content-center'
              >
                <Icon path={mdiPlusCircle} size={1.5} className='mx-2' />
                <SpanButton>Add a new task</SpanButton>
              </Button>
              {todos?.getTodos.length ? (
                <Button
                  variant='danger'
                  onClick={() => deleteTodos().then(refetchTodos)}
                  className='ms-4 d-flex align-items-center justify-content-center mt-2 mt-md-0'
                >
                  <Icon path={mdiDeleteCircle} size={1.5} className='mx-2' />

                  <SpanButton>Delete All</SpanButton>
                </Button>
              ) : null}
            </ButtonsContainer>
          </>
        )}
        <ModalCreateTodo
          showTodoModal={showTodoModal}
          setShowTodoModal={setShowTodoModal}
          refetchTodos={refetchTodos}
        />
      </Container>
    </HomeContainer>
  )
}

export default Home
