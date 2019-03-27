import React from 'react'
import { ApolloProvider } from "react-apollo";


import apolloClient from './apollo'

const Provider = ({ children }) => (
    <ApolloProvider client={apolloClient}>
        {children}
    </ApolloProvider>
)


export default Provider
