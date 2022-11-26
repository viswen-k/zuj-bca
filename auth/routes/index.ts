const express = require('express')
const router = express.Router();

/* route to APIs within core/routes/fixtures */
router.use("/api/fixtures", require("@path/routes/fixtures").default);

export default router;
