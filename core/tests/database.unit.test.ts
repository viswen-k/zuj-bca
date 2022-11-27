import fs from 'fs';
import Toml from 'toml';
import { Sequelize } from 'sequelize';
require('iconv-lite').encodingExists('foo');

describe('database connection check', () => {
  it('successful connection', async () => {
    const config_path = './auth/config/local.toml';
    const config = Toml.parse(fs.readFileSync(config_path, 'utf8'));
    expect(config.app.http_port).toBe(8181);

    const { datasource } = config;
    const { name, username, password, schema, options } = datasource;
    const sequelize = new Sequelize(schema, username, password, options);

    let output: string = '';

    await sequelize
      .authenticate()
      .then(() => (output = `connect datasource success ${name}`))
      .catch((e: any) => (output = `datasource failed: ${e}`));

    expect(output).toBe(`connect datasource success ${name}`);
  });
});
