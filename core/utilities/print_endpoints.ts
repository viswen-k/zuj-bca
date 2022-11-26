import { Express } from 'express';
import list_endpoints from 'express-list-endpoints';
import chirp from './chirp';

/* print all API endpoint in console */
export default (app: Express) => {
  const endpoints = list_endpoints(app);
  const lines = endpoints.reduce((accum: string[], route) => {
    const { methods, path } = route;
    return accum.concat(
      methods.map((method: string) => {
        return `  ${method}       `.substring(0, 9) + path;
      })
    );
  }, []);
  chirp(`endpoints list:\n${lines.join('\n')}`);
};
