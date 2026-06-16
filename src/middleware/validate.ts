import { RequestHandler } from 'express';
import { ZodTypeAny } from 'zod';

export type ValidationSource = 'body' | 'query' | 'params';

export const validate =
  (schema: ZodTypeAny, source: ValidationSource = 'body'): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      next(result.error);
      return;
    }
    req[source] = result.data;
    next();
  };
