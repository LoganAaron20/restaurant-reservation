function bodyHasProperty(property) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[property] === 0 || (data[property] && data[property] !== "")) {
      return next();
    } else {
      next({
        status: 400,
        message: `Reservation must include a ${property} property`,
      });
    }
  };
}

module.exports = bodyHasProperty;
