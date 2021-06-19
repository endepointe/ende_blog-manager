const db = require('../db-init')

const blog = () => {
	const query = `delete from blogpost where id > 0;`;
	db.none(query);
	return;
}

module.exports = {blog: blog}