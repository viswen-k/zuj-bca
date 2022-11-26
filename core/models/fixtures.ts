import CrudModel from '@path/models/crud_model';
import Datasource from '@path/models/datasource';
import { model_specs, model_utils } from '@path/utilities';

const sequelize = Datasource.source('default-db');

class Fixtures extends CrudModel {
  static TABLENAME = 'fixtures';

  public tournament!: string | null;
  public home_team!: string | null;
  public home_score!: number | null;
  public away_team!: string | null;
  public away_score!: number | null;
  public timestamp!: Date | null;

  toJSON(): object {
    var values: any = Object.assign({}, this.get());
    return values;
  }
}

const hooks = {};

Fixtures.init(
  {
    tournament: model_specs.generic_string(),
    home_team: model_specs.generic_string(),
    home_score: model_specs.number(),
    away_team: model_specs.generic_string(),
    away_score: model_specs.number(),
    timestamp: model_specs.timestamp(),
  },
  {
    ...model_utils.model_defaults(Fixtures.TABLENAME),
    hooks,
    sequelize,
  }
);

export default Fixtures;
