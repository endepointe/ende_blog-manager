const express = require('express')
require('dotenv').config({path: './.env'});
const cors = require('cors');
const app = express();
const get = require('./api/get')
const post = require('./api/post')

let corsOptions = {
	origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));
// default "application/json"
app.use(express.json())

app.use('/api/get', get);
app.use('/api/post', post);

app.get('/api', async (req, res, next) => {
	res.json({msg: 'at /api'})	
	next();
})

app.listen(3001, () => {
	console.log('blog server listening on port 3001')
})