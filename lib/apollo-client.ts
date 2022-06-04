import { ApolloClient, InMemoryCache } from '@apollo/client'
import { useMemo } from 'react'

let apolloClient: any

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache(),
    uri: '/api/graphql'
  })
}
export function initializeApollo(initialState: any = null) {
  const newApolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    newApolloClient.cache.restore(initialState)
  }
  if (typeof window === 'undefined') return newApolloClient
  if (!apolloClient) apolloClient = newApolloClient

  return newApolloClient
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
