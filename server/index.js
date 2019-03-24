const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
// const opn = require('opn');
require('dotenv').config()
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
require('colors')
const getVersion = require('./get_version')




const app = express()

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// webpack/react hot loader
// 
app.use((req, res, next) => {
	console.log(req.method, req.url.yellow)
	next()
})

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.urlencoded({ extended: true, type: 'multipart/form-data' }))
// app.use(bodyParser.json())


if (process.env.NODE_ENV == 'hot') {
	const wConf = require('../builder/webpack.config')
	const compiler = webpack(wConf)



	app.use(webpackDevMiddleware(compiler, {
			publicPath: wConf.output.publicPath,
			noInfo: true,
			stats: {
				colors: true,
			},
		}));

	app.use(webpackHotMiddleware(compiler));

}



app.use(express.static(path.join(__dirname, 'files')));
app.use(express.static(path.join(__dirname, 'static')));





app.use((req, res) => {
	res.render('index', {
		vers: getVersion()
	})
})

app.use((err, req, res, next) => {
	console.error(err);
	res.end('Error') 
})

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, err => {
	if (err) return console.error(err);
	console.log('File-server Start!'.yellow + ', ' + ('http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT).green)
    // opn('http://' + process.env.CLIENT_HOST + ':' + process.env.CLIENT_PORT);
})