import { cruder } from '@path/middlewares';
import { Fixtures } from '@path/models';

const express = require('express');
const router = express.Router();

router.get('/list', cruder.list(Fixtures));
router.get('/dates', require('./dates').default);

export default router;
