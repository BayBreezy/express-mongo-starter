const router = require("express").Router();

//call v1 of the router API
router.use("/api/v1", require("./v1"));
module.exports = router;
