const knex = require("../db/connection");

const tableName = "reservations";

function list(reservation_date) {
    return knex(tableName).select("*").where({reservation_date}).orderBy("reservation_time", "asc");
}

function create(reservation) {
    return knex(tableName)
        .insert(reservation)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

function findByDateAndTime(reservation_date, reservation_time) {
    return knex(tableName).select("*").where({reservation_date}).where({reservation_time});
}
module.exports = {
    list,
    create,
    findByDateAndTime
}