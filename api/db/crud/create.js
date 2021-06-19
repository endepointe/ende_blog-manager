const db = require('../db-init');

const blogEntry = async (data) => {
	const query = `INSERT INTO BlogPost(title, posted, content) 
									VALUES($1,$2,$3) RETURNING id`;
	let response = await db.one(query, [
																			`${data.title}`, 
																			`${data.posted}`,
																			`${data.content}`
																		]);
	return await response;
}

module.exports = {blogEntry: blogEntry};