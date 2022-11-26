import { BadRequestError, RequestError, ServerError } from '@path/errors';
import { chirp } from '@path/utilities';
import { NextFunction, Request as ExpressRequest, RequestHandler, Response as ExpressResponse } from 'express';
import { UniqueConstraintError } from 'sequelize';
import { QueryExtras, QueryOptions } from './query_parser';

export type Request = ExpressRequest & {
  attr?: { [index: string]: any };
  extras?: QueryExtras;

  parse_query?: () => QueryOptions;
};

export type Response = ExpressResponse & {
  result?: any;
  meta?: any;
};

export type RequestBody = ExpressRequest['body'];

export class MiddlewareError extends ServerError {}
export type MiddleHandler = (req: Request, res: Response) => Promise<void> | void;
export type ResponseError = {
  type: string;
  message: string;
  code: number;
  errors?: any;
};

/* handle errors filtered by type of thrownError  */
const error_handler = (req: Request, res: Response, next: NextFunction) => {
  return (thrownError: Error & { code: any }) => {
    console.error('error handler', thrownError);
    chirp('error handler', thrownError.constructor?.name);

    if (!thrownError.constructor) {
      return res.status(500).send(thrownError);
    }

    if (thrownError.constructor !== BadRequestError) {
      chirp('server error', thrownError.stack);
    }

    const error: ResponseError = {
      type: thrownError.constructor.name,
      message: thrownError.message,
      code: thrownError.code,
    };

    if ((<any>thrownError).extras) {
      error.errors = (<RequestError>thrownError).extras;
    } else if (thrownError instanceof ServerError) {
      error.code = 500;
    } else if (thrownError instanceof UniqueConstraintError) {
      error.errors = thrownError.errors;
    }

    res.status(error.code || 500).send({ error });
  };
};

/* define new request and response objects for API calls */
export const make = (serve: MiddleHandler): RequestHandler => {
  if (typeof serve !== 'function') throw new MiddlewareError('invalid serve function');

  return (req: ExpressRequest, res: ExpressResponse, next) => {
    const result = serve(req, res);
    return Promise.resolve(result)
      .then(() => next())
      .catch(error_handler(req, res, next));
  };
};
