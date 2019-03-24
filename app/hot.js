import React from 'react'
import { render } from 'react-dom'
import App from './app'


const rootId = window.document.getElementById('root')


const  renderToId = Comp => {
    render(<Comp />, rootId)
}

renderToId(App)


if(module.hot) {
	module.hot.accept('./app',()=>{
		let NewApp = require('./app').default
		renderToId(NewApp)
	})
}