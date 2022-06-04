import styled from 'styled-components'

export const TodoContainer = styled.div`
  width: 90%;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fffdfd;
  margin: 1rem 2rem;
`

export const TopicContainer = styled.span`
  font-weight: bold;
  margin-right: 2rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  width: fit-content;
`
export const ContentContainer = styled.span`
  margin-right: 2rem;
`

interface ITodoIconProps {
  done: boolean
}

export const TodoIcon = styled.span<ITodoIconProps>`
  width: 20px;
  margin-right: 0.6rem;
  height: 20px;
  border: none;
  border-radius: 100%;
  background: ${(props) => (props.done ? 'green' : 'red')};
`
