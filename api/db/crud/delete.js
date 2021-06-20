const db = require('../db-init')

const blog = (data) => {
	console.log(data.id)
	const query = `delete from blogpost where id = $1`;
	db.none(query, [`${data.id}`]);
	return;
}

module.exports = {blog: blog}