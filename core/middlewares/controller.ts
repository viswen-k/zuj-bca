import { RequestHandler } from 'express';
import _path from 'path';
import { make, MiddleHandler } from './middleware';

/* middleware to define API functions easily */
export const controller = (arg1: MiddleHandler): Array<RequestHandler> => {
  let serve: MiddleHandler = <MiddleHandler>arg1;

  return [
    make(async (req, res) => {
      res.result = {};
    }),
    make(serve),
    make((req, res) => {
      let { result, meta } = res;
      if (!result) return;
      res.status(200).send({ result, meta });
    }),
  ];
};
