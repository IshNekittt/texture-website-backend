import { HttpError } from 'http-errors';

export const errorHandler = (err, _req, res, _next) => {
  if (err.name === 'ValidationError') {
    res.status(400).json({
      status: 400,
      message: err.message,
      data: err.details,
    });
  }

  if (err.code === 11000) {
    res.status(409).json({
      status: 409,
      message: 'A resource with this data already exists.',
      data: {
        field: Object.keys(err.keyValue)[0],
        value: Object.values(err.keyValue)[0],
      },
    });
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.statusCode,
      message: err.name,
      data: err.message,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
