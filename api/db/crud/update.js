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

const blogContent = async (data) => {
	const query = `update blogpost set content = $1, modified = $2 where id = $3`;
	let response = await db.none(query, [
																			`${data.content}`,
																			`${data.modified}`,
																			`${data.id}`,
																		]);
	return await response;
}

module.exports = {blogTitle: blogTitle, blogContent: blogContent}