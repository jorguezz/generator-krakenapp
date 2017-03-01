const Database = require('../../db.js').Database;
const db = new Database();

const queries = {

};

Object.assign(queries, require('../common/query.js'));
module.exports = queries;
