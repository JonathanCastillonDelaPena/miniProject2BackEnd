const buyer = require("../controllers/buyerController");
const router = require("express").Router();

router.post("/", buyer.create);

router.get("/", buyer.findAll);

router.get("/:id", buyer.findOne);

router.put("/:id", buyer.update);

router.delete("/:id", buyer.remove);

module.exports = router;
