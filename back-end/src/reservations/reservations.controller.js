const reservationService = require("./reservations.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");
const bodyDataHas = require("../utils/bodyDataHas");
const { check, validationResult } = require("express-validator");

// Functionality to retrieve all records from the reservations table to send back the the user;
function list(req, res, next) {
  reservationService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

// Created a newly created reservation, then adds the new reservation to the database
const create = (req, res, next) => {
  console.log("Entered create middleware!");
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = req.body.data;

  const newReservation = {
    first_name: first_name,
    last_name: last_name,
    mobile_number: mobile_number,
    reservation_date: reservation_date,
    reservation_time: reservation_time,
    people: people,
  };
  reservationService
    .create(newReservation)
    .then((createdReservation) =>
      res.status(201).json({ data: createdReservation })
    );
};

// Validation to check if the "people" property in the req body is a Number;
function validPeople(req, res, next) {
  const {
    data: { people },
  } = req.body;
  const regEx = /^[0-9]*$/;
  if (people !== regEx) {
    return next({
      status: 400,
      message: `${people} is an invalid number for people.`,
    });
  } else {
    return next();
  }
};

function propertyHasValue(req, res, next) {
  const { data: { reservation_date, reservation_time, people } } = req.body;

  let regEx = /^[0-9]*$/;

  
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    asyncErrorBoundary(create),
  ],
  read: [],
};
