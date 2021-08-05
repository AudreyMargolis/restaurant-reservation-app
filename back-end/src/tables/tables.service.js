const knex = require("../db/connection");

const tableName = "tables";

function list() {
    console.log("service table list called");
    return knex(tableName).select("*");
}

function create(table) {
    return knex(tableName)
        .insert({ ...table, taken: false })
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}




module.exports = {
    list,
    create,
}