const express = require('express');
const create = require('../db/crud/create');
const router = express.Router();

router.post('/create', async (req, res, next) => {
	console.log(req.params)
	try {
		let entry = await create.blogEntry()
		console.log(entry);
		res.json({entry});
	} catch(e) {
		console.error(e)
	} finally {
		next();
	}
})

module.exports = router;