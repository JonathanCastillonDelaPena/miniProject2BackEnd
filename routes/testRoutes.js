const test = require("../controllers/testController");
const router = require("express").Router();

router.get("/", test.findAll);

router.post("/", test.create);

module.exports = router;
