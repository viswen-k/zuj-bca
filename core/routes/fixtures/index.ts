import { cruder } from '@path/middlewares';
import { Fixtures } from '@path/models';

const express = require('express');
const router = express.Router();
router.use(express.json());

/* to retrieve list of fixtures via cruder */
router.get('/list', cruder.list(Fixtures));

/* to retrieve dates of fixtures */
router.get('/dates', require('./dates').default);

export default router;
