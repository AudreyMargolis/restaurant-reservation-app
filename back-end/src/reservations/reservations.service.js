const knex = require("../db/connection");

const tableName = "reservations";

function list(reservation_date) {
    return knex(tableName).select("*")
    .where({reservation_date})
    .whereNot({status: "finished"})
    .orderBy("reservation_time", "asc");
}

function create(reservation) {
    return knex(tableName)
        .insert(reservation)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}
function update(reservation_id, status) {
    return knex(tableName)
      .where({ reservation_id })
      .update("status", status)
      .returning("*")
      .then((createdRecords) => createdRecords[0]);
  }
function findByDateAndTime(reservation_date, reservation_time) {
    return knex(tableName).select("*").where({reservation_date}).where({reservation_time}).whereNot({"status": "finished"})
}
function read(reservation_id) {
    return knex(tableName).where({ reservation_id }).first();
}
module.exports = {
    list,
    create,
    findByDateAndTime,
    update,
    read
}