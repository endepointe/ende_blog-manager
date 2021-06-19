const db = require('../init');

const blogEntry = async (data) => {
	let response = await db.one(`INSERT INTO BlogPost(title, date, content) VALUES($1,$2,$3) RETURNING id`, [`${data.title}`, `${data.date}`,`${data.content}`]);
	return await response;
}

module.exports = {blogEntry: blogEntry};