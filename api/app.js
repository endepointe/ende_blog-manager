const express = require('express')
require('dotenv').config();
const db = require('./db/init');
const app = express();

console.log(db);
db.one('select * from blogpost;')
	.then((data) => {
		console.log(data);
	})
	.catch((err) => {
		console.error(err);
	});


app.listen(3000, () => {
	console.log('blog server listening on port 3000')
})