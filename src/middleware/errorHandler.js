
export function errorHandler(err, req, res, next) {
  // TASK 4a: Mongoose validation errors -> 400
  if (err.name === "ValidationError") {
    const fields = {};

    for (const key in err.errors) {
      fields[key] = err.errors[key].message;
    }

    return res.status(400).json({
      error: "ValidationError",
      fields,
    });
  }

  // TASK 4b: Invalid ObjectId or other cast errors -> 400
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "CastError",
      message: "Invalid ID format",
      field: err.path,
    });
  }

  // TASK 4c: Duplicate key errors -> 409
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(409).json({
      error: "DuplicateKey",
      message: field + " already exists",
      field,
    });
  }

  // Fallback: unknown errors -> 500
  console.error(err);

  res.status(500).json({
    error: "InternalServerError",
  });
}
