const express = require('express');
const read = require('../db/crud/read');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.json({msg: 'at /api/get/'})
	next();
})

router.get('/all', async (req, res, next) => {
	try {
		let entries = await read.allEntries()
		// console.log(entries);
		res.json({entries});
	} catch(e) {
		console.error(e)
	} finally {
		next();
	}
});

router.get('/one', async (req, res, next) => {
	console.log(req.query);
	try {
		let entry = await read.oneEntry(req.query);
		res.json({entry});
		// res.json({msg: 'pataam'})
	} catch(e) {
		console.error(e);
	} finally {
		next();
	}
});

module.exports = router;