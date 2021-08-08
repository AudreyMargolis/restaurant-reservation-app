const knex = require("../db/connection");

const tableName = "tables";

function list() {
    console.log("service table list called");
    return knex(tableName).select("*").orderBy("table_name", "asc");
}

function create(table) {
    return knex(tableName)
        .insert(table)
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
function read(table_id) {
    return knex(tableName).where({ table_id }).first();
}
function update(updatedTable) {
    return knex(tableName)
      .where({ table_id: updatedTable.table_id })
      .update(updatedTable, "*")
      .returning("*")
      .then((createdRecords) => createdRecords[0]);
}



module.exports = {
    list,
    create,
    destroy,
    removeReservation,
    read,
    update
}