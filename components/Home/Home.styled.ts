import styled from 'styled-components'

export const HomeContainer = styled.div`
  background: #e6dcfe;
  min-height: 100vh;
  height: 100%;
`

export const SectionsContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5rem;
`

export const SectionTitle = styled.div`
  background: #f8e49d;
  font-size: 1.3rem;
  font-weight: bold;
  width: fit-content;
  padding: 0.75rem 3rem;
  border: none;
  border-radius: 0.5rem;
  margin-left: 1rem;
  box-shadow: -1px 6px 16px -2px rgba(0, 0, 0, 0.5);
  margin-top: 1rem;
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 2rem;
`

export const SpanButton = styled.span`
  font-size: 1.5rem;
`
export const EmptyListTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  height: 100vh;
`

export const SectionTitleContainer = styled.div`
  width: 100%;
`
