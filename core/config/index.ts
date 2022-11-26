import { ServerError } from '@path/errors';
import { chirp } from '@path/utilities';
import fs from 'fs';
import Toml from 'toml';

export type Configurations = {
  [index: string]: any;
};

/* declare node environment */
const NODE_ENV = process.env.NODE_ENV || 'development';

/* load configurations from each config file in /auth/config */
const load_config = (filename: string) => {
  const config_path = `${config.__config_folder}/${filename}.toml`;
  try {
    chirp(`loading config "${config_path}"`);
    const toml = Toml.parse(fs.readFileSync(config_path, 'utf8'));
    if (toml.__configure) throw new ServerError('__configure is a reserved keyword in the configs');
    if (toml.__config_folder) throw new ServerError('__config_folder is a reserved keyword in the configs');
    return toml;
  } catch (e) {
    chirp(`config "${config_path}" cannot be read`);
  }
};

/* for each toml file, load up the configuration */
const configure = (config_folder: string) => {
  config.__config_folder = config_folder;

  const env_config = load_config(NODE_ENV);
  Object.assign(config, env_config);

  const local_config = load_config('local');
  if (local_config) Object.assign(config, local_config);
};

const config: any = { __configure: configure };

export default config;
