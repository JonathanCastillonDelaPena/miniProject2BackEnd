const cart = require("../controllers/cartController");
const router = require("express").Router();

router.post("/", cart.create);

router.get("/", cart.findAll);

router.get("/:id", cart.findOne);

router.put("/:id", cart.update);

router.delete("/:id", cart.remove);

module.exports = router;
