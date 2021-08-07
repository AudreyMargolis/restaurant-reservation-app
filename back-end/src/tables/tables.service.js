const knex = require("../db/connection");

const tableName = "tables";

function list() {
    console.log("service table list called");
    return knex(tableName).select("*").orderBy("table_name", "asc");
}

function create(table) {
    return knex(tableName)
        .insert({ ...table, taken: false })
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

function destroy(table_id) {
    return knex(tableName)
        .where({ table_id })
        .del();
}
function removeReservation(table_id) {
    return knex(tableName)
        .where({ table_id })
        .del();
}




module.exports = {
    list,
    create,
    destroy,
    removeReservation
}