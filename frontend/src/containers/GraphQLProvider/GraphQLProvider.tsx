import React, { useEffect } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, from, ServerError, ServerParseError } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { onError } from '@apollo/client/link/error'

import { SERVER_URL } from 'services/api'
import { __DEV__ } from 'constants/environment'
import { authService } from 'services/authService'

const cache = new InMemoryCache()

export const GRAPHQL_URL = `${SERVER_URL}/graphql`

const errorHandlerLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    )
  if (networkError) {
    console.error(`[Network error]: ${networkError}`)

    if ((networkError as ServerError | ServerParseError).response) {
      const error = networkError as ServerError | ServerParseError

      if (error.response.status === 401) {
        authService.logout().catch(() => {})
      }
    }
  }
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

const httpLink = new BatchHttpLink({
  uri: GRAPHQL_URL,
})

const client = new ApolloClient({
  link: from([errorHandlerLink, authLink, httpLink]),
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
