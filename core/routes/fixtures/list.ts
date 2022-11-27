import { ValidationError } from '@path/errors';
import { controller, query_meta, Request, Response } from '@path/middlewares';
import { Fixtures } from '@path/models';
import moment from 'moment';
import { Op } from 'sequelize';

export default controller(async (req: Request, res: Response) => {
  /* pull query options from parse_query middleware */
  let options = req.parse_query!();
  const start_date = req.query.start_date?.toString();
  const end_date = req.query.end_date?.toString();

  /*
   * validation check on start_date and end_date query parameters,
   * to update where parameter with respective query parameters
   */
  if (start_date && end_date) {
    if (moment(start_date).isValid() && moment(end_date).isValid()) {
      options.where = { timestamp: { [Op.gte]: start_date, [Op.lt]: moment(end_date).add(1, 'day') } };
    } else {
      throw new ValidationError('wrong date format');
    }
  } else if (start_date) {
    if (moment(start_date).isValid()) {
      options.where = { timestamp: { [Op.gte]: start_date, [Op.lt]: moment(start_date).add(1, 'day') } };
    } else {
      throw new ValidationError('wrong date format');
    }
  }

  /* to retrieve list of fixtures */
  const fixtures = await Fixtures.findAll({ ...options });
  const count = await Fixtures.count({
    ...options,
    distinct: true,
    col: `${Fixtures.getTableName()}.${'id'}`,
  });

  res.result.models = fixtures;
  res.result.meta = query_meta(options, count);
});
