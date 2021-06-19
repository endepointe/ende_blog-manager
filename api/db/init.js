const pgp = require('pg-promise')();

/**
 * to reset the BlogPost table:
 * 
 * delete from blogpost where id > n;
 * alter sequence blogpost_id_seq restart with m;
 * 
 * ********NOTES: 
 * 	m must be > 0
 * 	if m = n and n exists, there will ba a duplicate key value error
 */

const cn = {
	host: process.env.EP_HOST,
	port: 5432,
	database: process.env.EP_DATABASE,
	user: process.env.EP_USER,
	password: process.env.EP_PASSWORD,
	ssl: {rejectUnauthorized: false},
	max: 30 // use up to 30 connections
};

const db = pgp(cn);

module.exports = db;