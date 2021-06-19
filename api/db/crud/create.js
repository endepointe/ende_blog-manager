const db = require('../db-init');

const blogEntry = async (data) => {
	const query = `INSERT INTO BlogPost(title, date, content) 
									VALUES($1,$2,$3) RETURNING id`;
	let response = await db.one(query, [
																			`${data.title}`, 
																			`${data.date}`,
																			`${data.content}`
																		]);
	return await response;
}

module.exports = {blogEntry: blogEntry};