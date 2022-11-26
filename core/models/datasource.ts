import config from "@path/config";
import { GenericError } from "@path/errors";
import { chirp } from "@path/utilities";
import { Sequelize } from "sequelize";

export class DatasourceError extends GenericError { }

class Datasource {
  sources: { [index: string]: Sequelize } = {};

  constructor() {
    const { datasources } = config;
    for (const datasource of datasources) {
      const { name, username, password, schema, options } = datasource;
      chirp(`init datasource ${name}`);
      const sequelize = new Sequelize(schema, username, password, options);
      sequelize.authenticate()
        .then(() => chirp(`connect datasource success ${name}`))
        .catch((e: any) => chirp(`datasource failed`, e));
      this.sources[name] = sequelize;
    }
  }

  source(name: string) {
    if (!this.sources[name])
      throw new DatasourceError(`invalid datasource:${name}`);
    return this.sources[name];
  }
}

export default new Datasource();
