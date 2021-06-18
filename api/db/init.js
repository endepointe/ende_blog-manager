const pgp = require('pg-promise')();

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