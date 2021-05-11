import React, { useEffect } from 'react'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { SERVER_URL } from 'services/api'
import { __DEV__ } from 'constants/environment'

const cache = new InMemoryCache()

export const GRAPHQL_URL = `${SERVER_URL}/graphql`

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('identity')

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  connectToDevTools: __DEV__,
})

type Props = {
  children: React.ReactNode
}

export const GraphQLProvider = ({ children }: Props) => {
  useEffect(() => () => void client.resetStore(), [])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
