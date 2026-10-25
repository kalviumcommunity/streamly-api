
export function errorHandler(err, req, res, next) {
  // 1. Mongoose validation error -> 400 Bad Request
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

  // 2. Invalid MongoDB ID -> 400 Bad Request
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "CastError",
      message: "Invalid ID format",
      field: err.path,
    });
  }

  // 3. Duplicate unique field, such as slug -> 409 Conflict
  if (err.code === 11000) {
    const field =
      Object.keys(err.keyValue || {})[0] || "unknown";

    return res.status(409).json({
      error: "DuplicateKey",
      message: `${field} already exists`,
      field,
    });
  }

  // 4. Unexpected error -> 500 Internal Server Error
  console.error("ERROR DETAILS:", err);

  return res.status(500).json({
    error: "InternalServerError",
  });
}
