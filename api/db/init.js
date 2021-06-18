const pgp = require('pg-promise')();

const cn = {
	host: process.env.host,
	port: 5432,
	database: process.env.database,
	user: process.env.user,
	password: process.env.password,
	ssl: {rejectUnauthorized: false},
	max: 30 // use up to 30 connections
};

const db = pgp(cn);

module.exports = db;