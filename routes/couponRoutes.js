const coupon = require("../controllers/couponController");
const router = require("express").Router();

router.post("/", coupon.create);

router.get("/", coupon.findAll);

router.get("/:id", coupon.findOne);

router.put("/:id", coupon.update);

router.delete("/:id", coupon.remove);

module.exports = router;
