const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .select("*")
    .whereNot({ status: "finished" })
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function read(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(reservationId, data) {
  return knex("reservations")
    .where({ reservation_id: reservationId })
    .update(data)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function updateStatus(reservationId, status) {
  return knex("reservations")
    .where({ reservation_id: reservationId })
    .update({ status: status })
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  list,
  read,
  create,
  update,
  updateStatus,
  search,
};
