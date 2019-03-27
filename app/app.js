import React from 'react'
import styled from 'styled-components'

import Provider from 'data'
import Routes from './routes'
import GlobalStyles from 'styled/globals'



const App = () => (
    <Provider>
        <GlobalStyles />
        <Routes />
    </Provider>
)

export default App
