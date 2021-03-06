const express = require('express');
const router = express.Router();
const update = require('../db/crud/update')

/**
 * Receives the blog id
 * updates blog title
 */
router.put('/title', async (req, res, next) => {
	try {
		let updatedEntry = await update.blogTitle(req.body);
		res.json({updatedEntry})
	} catch (err) {
		console.error(err);
	} finally {
		next();
	}
})

router.put('/content', async (req, res, next) => {
	try {
		let updatedEntry = await update.blogContent(req.body);
		res.json({updatedEntry})
	} catch (err) {
		console.error(err);
	} finally {
		next();
	}
})

module.exports = router;