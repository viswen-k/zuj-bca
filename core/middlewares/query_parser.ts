import { number_or_zero } from '@path/utilities/string_utils';
import { RequestHandler } from 'express';
import { FindOptions, OrderItem as OrderItemOptions } from 'sequelize';
import { make, Request, Response } from './middleware';

const DEFAULT_QUERY_LIMIT = 10;

export type QueryExtras = { [index: string]: any };
export type QueryConfig = {
  query: any;
  extras: QueryExtras;
  options: QueryOptions;
};

export type QueryMeta = {
  count: number;
  limit?: number;
  offset?: number;
  search?: string;
};

export class QueryOptions implements FindOptions {
  limit?: number;
  offset?: number;
  order?: OrderItemOptions[];

  add_order(column: string, order: 'asc' | 'desc' = 'asc') {
    if (!this.order) this.order = [];
    this.order.push([column, order]);
  }
}

/* function to parse query parameters into cruder */
export const parse_query = (): RequestHandler => {
  return make((req: Request, res: Response) => {
    if (req.parse_query) return;

    req.parse_query = (): QueryOptions => {
      const query = req.query;
      const options = new QueryOptions();
      options.offset = number_or_zero(query.offset);
      if (query.nolimit !== 'true') {
        options.limit = number_or_zero(query.limit);

        if (options.limit === 0 && query.limit === undefined) options.limit = DEFAULT_QUERY_LIMIT;
      }
      return options;
    };
  });
};

/* function to simplify meta data output for cruder requests */
export const query_meta = (options: QueryOptions, count: number): QueryMeta => {
  return {
    count,
    limit: options.limit,
    offset: options.offset,
  };
};
