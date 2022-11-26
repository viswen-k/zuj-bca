import { controller, Request, Response } from '@path/middlewares';
import { Fixtures } from '@path/models';
import sequelize from 'sequelize';

export default controller(async (req: Request, res: Response) => {
  const dates = await Fixtures.findAll({
    attributes: [[sequelize.fn('DATE_FORMAT', sequelize.col('timestamp'), '%d-%m-%Y'), 'date']],
    group: 'date',
  });

  res.result = dates;
});
