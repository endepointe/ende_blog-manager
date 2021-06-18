const db = require('../init');

const blogEntry = async (data) => {
	let response = await db.one('INSERT INTO BlogPost(title, date, content) VALUES($1,$2,$3) RETURNING id', ["second", 'June 17, 2021','a second blog post entry within create.js']);
	return await response;
}

module.exports = {blogEntry: blogEntry};