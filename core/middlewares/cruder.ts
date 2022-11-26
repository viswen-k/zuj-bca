import CrudModel from '@path/models/crud_model';
import { model_utils } from '@path/utilities';
import { RequestHandler } from 'express';
import { controller } from './controller';
import { Request, Response } from './middleware';
import { parse_query, query_meta } from './query_parser';

/* middleware to handle database table retrieval */
export namespace cruder {
  export const list = (model_def: typeof CrudModel): Array<RequestHandler> => {
    const ctrl = controller(async (req: Request, res: Response) => {
      const scoped_model_def = model_utils.scope(model_def);

      const options = req.parse_query!();

      const models = await scoped_model_def.findAll({ ...options });
      const count = await scoped_model_def.count({
        ...options,
        distinct: true,
        col: `${scoped_model_def.getTableName()}.${'id'}`,
      });
      res.result.models = models;
      res.result.meta = query_meta(options, count);
    });

    return [parse_query(), ...ctrl];
  };
}
