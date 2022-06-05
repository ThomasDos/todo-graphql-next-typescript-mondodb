import styled from 'styled-components'

export const TodoContainer = styled.div`
  width: 90%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background: #fffdfd;
  margin: 1rem 2rem;
  border-radius: 5px;
  box-shadow: -1px 4px 15px -2px rgba(0, 0, 0, 0.2);
  @media (min-width: 572px) {
    flex-direction: row;
  }
`

export const TopicContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const TopicContainer = styled.span`
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  width: fit-content;
  margin-bottom: 0.5rem;
`
export const ContentContainer = styled.span`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
`

interface ITodoIconProps {
  done: boolean
}

export const TodoIcon = styled.span<ITodoIconProps>`
  width: 1rem;
  height: 1rem;
  margin-right: 0.6rem;
  border: none;
  border-radius: 100%;
  background: ${(props) => (props.done ? 'green' : 'red')};
`

export const SwitchAndButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.7rem;
  flex: 1;
  margin-top: 1rem;
`
