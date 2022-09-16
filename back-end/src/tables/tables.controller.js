// const service = require("./tables.service");
// const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// async function tableExists(req, res, next) {
//   const { table_id } = req.params;

//   let table = await service.read(table_id);

//   const error = { status: 404, message: `Table ${table_id} cannot be found.` };

//   if (table) {
//     res.locals.table = table;
//     return next();
//   }

//   next(error);
// }

// async function validateNewTable(req, res, next) {
//   if (!req.body.data) {
//     return next({
//       status: 400,
//       message: "Data Missing!",
//     });
//   }

//   const { table_name, capacity, reservation_id } = req.body.data;

//   if (!table_name || !capacity) {
//     return next({
//       status: 400,
//       message: "Please complete the following: table_name, capacity",
//     });
//   }

//   if (table_name.length <= 1) {
//     return next({
//       status: 400,
//       message: "table_name must be at least two characters",
//     });
//   }

//   res.locals.table = {
//     table_name,
//     capacity,
//     reservation_id,
//   };

//   next();
// }

// // Create

// async function create(_, res) {
//   const data = await service.create(res.locals.table);
//   res.status(201).json({
//     data: data[0],
//   });
// }

// // Read

// async function read(_, res) {
//   res.json({
//     data: res.locals.table,
//   });
// }

// // List

// async function list(_, res) {
//   const tables = await service.list();

//   res.json({ data: tables });
// }

// module.exports = {
//   create: [asyncErrorBoundary(validateNewTable), asyncErrorBoundary(create)],
//   list: [asyncErrorBoundary(list)],
//   read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
//   tableExists,
// };

const service = require("./tables.service");
const resService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const bodyHasProperty = require("../errors/bodyHasProperty");
const isValidTableName = require("../errors/isValidTableName");
const isValidCapacity = require("../errors/isValidCapacity");
const tableExists = require("../errors/tableExists");
const reservationExists = require("../errors/reservationExists");

async function list(req, res, next) {
  const table = await service.list();

  res.json({ data: table });
}

async function create(req, res, next) {
  const newTable = req.body.data;

  const table = await service.create(newTable);

  res.status(201).json({ data: table });
}

async function update(req, res, next) {
  const { reservation_id } = req.body.data;
  let { table_id } = req.params;
  table_id = Number(table_id);

  const { people } = res.locals.reservation;
  const { capacity } = res.locals.table;

  if (people > capacity) {
    next({
      status: 400,
      message: `capacity should be an integer greater than 0`,
    });
  } else if (res.locals.table.reservation_id) {
    next({
      status: 400,
      message: `that table is currently occupied`,
    });
  } else if (res.locals.reservation.status === "seated") {
    next({
      status: 400,
      message: `That reservation is currently seated`,
    });
  } else {
    const updatedTable = await service.update(table_id, reservation_id);

    res.json({ data: updatedTable });
  }
}

async function removeReservation(req, res, next) {
  const { table_id } = req.params;

  const { table } = res.locals;

  if (!table.reservation_id) {
    next({
      status: 400,
      message: `Table ${table_id} is not occupied. Nothing was changed.`,
    });
  } else {
    const updatedTable = await service.removeReservation(
      table_id,
      table.reservation_id
    );

    res.json({ data: updatedTable });
  }
}

module.exports = {
  list,
  create: [
    bodyHasProperty("table_name"),
    isValidTableName,
    bodyHasProperty("capacity"),
    isValidCapacity,
    asyncErrorBoundary(create),
  ],
  update: [
    bodyHasProperty("reservation_id"),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(update),
  ],
  removeReservation: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(removeReservation),
  ],
};
