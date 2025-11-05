import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (idName) => (req, _res, next) => {
  const id = req.params[idName];

  if (!id) {
    return next(createHttpError(400, `Missing parameter: ${idName}`));
  }

  if (!isValidObjectId(id)) {
    return next(
      createHttpError(
        400,
        `Invalid ID format for ${idName}. Must be of type ObjectId.`,
      ),
    );
  }

  next();
};
