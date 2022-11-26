import { ValidationError } from '@path/errors';
import { controller, Request, Response } from '@path/middlewares';
import { Fixtures } from '@path/models';
import { is_number } from '@path/utilities';
import sequelize, { Op } from 'sequelize';

export default controller(async (req: Request, res: Response) => {

  /* validation check on month and year body parameters */
  if (!is_number(req.body.month) || req.body.month < 1 || req.body.month > 12) throw new ValidationError('invalid month');
  if (!is_number(req.body.year)) throw new ValidationError('invalid year');

  /* to retrieve dates of fixtures */
  const dates = await Fixtures.findAll({
    where: {
      [Op.and]: [sequelize.where(sequelize.fn('MONTH', sequelize.col('timestamp')), req.body.month), sequelize.where(sequelize.fn('YEAR', sequelize.col('timestamp')), req.body.year)],
    },
    attributes: [[sequelize.fn('DATE_FORMAT', sequelize.col('timestamp'), '%d-%m-%Y'), 'date']],
    group: 'date',
  });

  res.result = dates;
});
