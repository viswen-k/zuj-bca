import { cruder, parse_query } from '@path/middlewares';
import { Fixtures } from '@path/models';

const express = require('express');
const router = express.Router();
router.use(express.json());

/* to retrieve list of fixtures */
router.get('/list', parse_query(), require('./list').default);

/* to retrieve dates of fixtures */
router.get('/dates', require('./dates').default);

export default router;
