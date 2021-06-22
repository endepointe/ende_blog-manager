const db = require('../db-init');

const allEntries = async () => {
	console.log('reading all entries')
	let response = await db.any('select * from blogpost;');
	return await response;
}

const oneEntry = async (data) => {
	console.log('reading one blog post');
	if (data.id == '--') {
		return 'select a value';
	}
	let response = await db.one(`select * from blogpost where id = $1`, 
	[
		`${data.id}`
	]);
	return await response;
}

module.exports = {	
	allEntries: allEntries,
	oneEntry: oneEntry
};