export const errorHandler = (err, req, res, next) => {
  // Validation error
  if (err.name === "ValidationError") {
    const errors = {};

    Object.keys(err.errors).forEach((field) => {
      errors[field] = err.errors[field].message;
    });

    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
      field: err.path,
    });
  }

  // Duplicate unique field
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(409).json({
      message: `Duplicate value for field: ${field}`,
      field,
    });
  }

  // Default server error
  return res.status(500).json({
    message: "Internal server error",
  });
};