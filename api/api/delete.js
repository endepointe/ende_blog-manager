const express = require('express');
const router = express.Router();
// delete is a keyword
const remove = require('../db/crud/delete')

/**
 * Receives the blog id
 * delete blog
 */
router.delete('/blog', (req, res, next) => {
	console.log(req.body);
	try {
		remove.blog(req.body);
		res.json({msg: 'blog deleted'})
	} catch (err) {
		console.error(err);
	} finally {
		next();
	}
})

module.exports = router;