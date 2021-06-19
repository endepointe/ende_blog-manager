const db = require('../db-init');

const allEntries = async () => {
	console.log('reading all entries')
	let response = await db.any('select * from blogpost;');
	return await response;
}

module.exports = {	allEntries: allEntries };