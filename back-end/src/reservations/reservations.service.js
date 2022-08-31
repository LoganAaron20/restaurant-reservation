const knex = require("../db/connection");

// Query to grab all records in the reservations table;
const list = () => {
  return knex("reservations").select("*");
};

// Accepts a reservation created by the user, then inserts the newly created reservation into the reservations table;
const create = (reservation) => {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .orderBy("reservation_time", "asc")
    .then((createdReservation) => createdReservation[0]);
};

module.exports = {
  list,
  create,
};
