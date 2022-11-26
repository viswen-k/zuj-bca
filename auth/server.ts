require('@path/utilities');
require('@path/config').default.__configure(`${__dirname}/config`);
require('@path/models');

import config from '@path/config';
import { chirp, print_endpoints } from '@path/utilities';
import helmet from 'helmet';
import routes from './routes';

const DEFAULT_HTTP_PORT = 8181;

(async () => {
  const express = require('express');
  const app = express();

  app.use(helmet());

  /* accesses API routes declared in /auth/routes/index.ts */
  app.use(routes);

  const http_port = config.app.http_port || DEFAULT_HTTP_PORT;
  app.listen(http_port, () => {
    /* print all API endpoints read by the server */
    print_endpoints(app);
    chirp(`server listening on ${http_port}`);
  });
})();
