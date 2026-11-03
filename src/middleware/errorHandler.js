
export function errorHandler(err, req, res, next) {

  // 1. Mongoose Validation Error -> 400
  if (err.name === "ValidationError") {
    const fields = {};

    for (const key in err.errors) {
      fields[key] = err.errors[key].message;
    }

    return res.status(400).json({
      error: "ValidationError",
      fields
    });
  }

  // 2. Invalid ObjectId -> 400
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "CastError",
      message: "Invalid ID format",
      field: err.path
    });
  }

  // 3. Duplicate Key Error -> 409
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(409).json({
      error: "DuplicateKey",
      message: field + " already exists",
      field
    });
  }

  // 4. Unknown Error -> 500
  console.error(err);
  res.status(500).json({
    error: "InternalServerError"
  });
}

