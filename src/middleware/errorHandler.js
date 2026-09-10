const errorHandler = (err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = {};

    for (const field in err.errors) {
      errors[field] = err.errors[field].message;
    }

    return res.status(400).json({
      errors,
    });
  }

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Invalid ID format",
      field: err.path,
    });
  }

  // Duplicate unique field
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(409).json({
      error: `Duplicate value for field: ${field}`,
      field,
    });
  }

  // Fallback
  res.status(500).json({
    error: "Internal server error",
  });
};

module.exports = errorHandler;