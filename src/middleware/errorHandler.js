export const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = {};
    for (const field in err.errors) {
      errors[field] = err.errors[field].message;
    }
    return res.status(400).json({ errors });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
      path: err.path,
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      message: `Duplicate value for field: ${field}`,
    });
  }

  res.status(500).json({ message: "Something went wrong" });
};