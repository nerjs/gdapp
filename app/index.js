import React from 'react'
import { render } from 'react-dom'

const rootId = window.document.getElementById('root')

import(
    /* webpackChunkName: "app" */
    './app'
).then(App => {
    console.log(App)
    render(<App.default />, rootId)
})
