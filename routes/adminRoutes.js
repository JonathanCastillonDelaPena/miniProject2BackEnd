const admin = require("../controllers/adminController");
const router = require("express").Router();

router.post("/", admin.create);

router.get("/", admin.findAll);

router.get("/:id", admin.findOne);

router.put("/:id", admin.update);

router.delete("/:id", admin.remove);

module.exports = router;
