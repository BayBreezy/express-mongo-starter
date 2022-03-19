const router = require("express").Router();

//call v1 of the router API
router.get("/test", (req, res, next) => {
	res.status(200).json({ message: "Working as expected 😎." });
});

router.use("/auth", require("./auth.routes.js"));

module.exports = router;
