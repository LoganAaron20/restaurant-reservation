
// Function that takes in a property as an argument;
// It then checks to confirm that the specified property name is included in the incoming post request;
// If property is not found, it will move on to the error handler with a status and message;

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    } else {
      return next({
        status: 400,
        message: `Missing ${propertyName}`,
      });
    }
  };
}

module.exports = bodyDataHas;
