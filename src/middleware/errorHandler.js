export const errorHandler = (err, req, res, next) => {
  console.error("Actual error:", err);

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

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
      field: err.path,
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "unknown";

    return res.status(409).json({
      message: `Duplicate value for field: ${field}`,
      field,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};
