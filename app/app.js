import React from 'react'
import styled from 'styled-components'


const Block = styled.div`
    color: ${({ color}) => color || 'yellow' };
    background: green;
`

const App = () => (
    <div>
        start
        <input type="text"/>
        <br />
        <Block color="#f0f0f6"> test</Block>
    </div>
)

export default App
