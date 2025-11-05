import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';

export const checkApiKey = (req, res, next) => {
  const serverApiKey = getEnvVar('API_SECRET_KEY');

  const clientApiKey = req.get('X-API-Key');

  if (!clientApiKey || clientApiKey !== serverApiKey) {
    return next(
      createHttpError(401, 'Unauthorized: Missing or invalid API key'),
    );
  }
  next();
};
