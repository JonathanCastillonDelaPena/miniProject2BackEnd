const product = require("../controllers/productController");
const router = require("express").Router();

router.post("/", product.create);

router.get("/", product.findAll);

router.put("/:id", product.update);

router.delete("/:id", product.remove);

module.exports = router;
