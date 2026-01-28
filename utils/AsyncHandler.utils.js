function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve()
      .then(() => {
        return fn(req, res, next);
      })
      .catch((err) => {
        res.status(err.statusCode || 500).json({
          success: false,
          message: err.message,
          errors: err.errors || [],
          data: null,
        });
      });
  };
}

export default asyncHandler;
