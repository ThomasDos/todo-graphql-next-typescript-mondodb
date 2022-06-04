import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import { useApollo } from '../lib/apollo-client'
import { ApolloProvider } from '@apollo/client'
import { GlobalStyles } from '../styles/globals'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
