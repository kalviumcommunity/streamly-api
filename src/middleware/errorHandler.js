
export function errorHandler(err, req, res, next) {
  // 1. Mongoose validation errors
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

  // 2. Invalid values, such as malformed MongoDB IDs
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "CastError",
      message: "Invalid ID format",
      field: err.path,
    });
  }

  // 3. Duplicate values rejected by a unique index
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue ?? {})[0] ?? "unknown";

    return res.status(409).json({
      error: "DuplicateKey",
      message: `${field} already exists`,
      field,
    });
  }

  // 4. Unexpected errors
  console.error(err);

  return res.status(500).json({
    error: "InternalServerError",
  });
}


