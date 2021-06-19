const db = require('../db-init')

const blogTitle = async (data) => {
	const query = `update blogpost set title = $1, modified = $2 where id = $3`;
	let response = await db.none(query, [
																			`${data.title}`,
																			`${data.modified}`,
																			`${data.id}`,
																		]);
	return await response;
}

const blogContent = async () => {
	// const query = `delete from blogpost where id > 1 returning *;`;
	const query = `update blogpost set content = 'new content' where id = 1 returning id;`;
	let response = await db.one(query);
	return await response;
}

module.exports = {blogTitle: blogTitle, blogContent: blogContent}