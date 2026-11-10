
const errorHandler = (err, req, res, next) => {

  // 1. Mongoose Validation Error
  if (err.name === "ValidationError") {
    const errors = {};

    for (const field in err.errors) {
      errors[field] = err.errors[field].message;
    }

    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  // 2. Mongoose Cast Error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
      field: err.path,
    });
  }

  // 3. MongoDB Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(409).json({
      message: `Duplicate value for field: ${field}`,
      field,
    });
  }

  // 4. Internal Server Error (500)
  console.error(err);

  return res.status(500).json({
    message: "Internal server error",
  });
};

export { errorHandler };
export default errorHandler;
