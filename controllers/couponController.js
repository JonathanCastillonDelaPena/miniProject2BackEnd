const db = require("../data/database");
const Coupon = db.coupons;

const create = (req, res) => {
  const data = req.body;

  if (Object.entries(data).length === 0) {
    res.status(400).send({ message: `Content cannot be empty.` });
    console.log(`\nCannot create empty Coupon.`);
    return;
  }

  const coupon = new Coupon({
    title: data.title,
    discount: data.discount,
    category: data.category,
    expiration: data.expiration,
  });

  coupon
    .save()
    .then((data) => {
      res.send(data);
      console.log(`\nNew Coupon added to the database:\n${data}`);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error while saving the Coupon to the database.`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError while saving the Coupon to the database.`);
    });
};

const findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Coupon.find(condition)
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({ message: `No Coupons found from the database.` });
        console.log(`\nNo Coupons found from the database.`);
      } else {
        res.send(data);
        console.log(`\nCoupons from database:\n${data}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error while finding all Coupons from database.`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError while finding all Coupons from database.`);
    });
};

const findOne = (req, res) => {
  const id = req.params.id;

  Coupon.findById(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: `Cannot find Coupon with id=${id}` });
        console.log(`\nCannot find Coupon with id=${id}`);
      } else {
        res.send(data);
        console.log(`\nFOUND Coupon with id=${id}\n${data}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error while finding Coupon with id=${id}`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError while finding Coupon with id=${id}`);
    });
};

const update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: `Data for update cannot be empty.` });
    console.log(`\nCannot update Coupon with empty Data.`);
    return;
  }

  const id = req.params.id;

  Coupon.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot update Coupon with id=${id}`,
        });
        console.log(`\nCannot update Coupon with id=${id}`);
      } else {
        res.send({ message: `Coupon with id=${id} was updated.` });
        console.log(`\nUPDATED Coupon with id=${id}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Coupon with id=${id}`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError updating Coupon with id=${id}`);
    });
};

const remove = (req, res) => {
  const id = req.params.id;

  Coupon.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot delete Coupon with id=${id}`,
        });
        console.log(`\nCannot delete Coupon with id=${id}`);
      } else {
        res.send({
          message: `Coupon with id=${id} was deleted.`,
        });
        console.log(`\nDELETED Coupon with id=${id}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting Coupon with id=${id}`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError deleting Coupon with id=${id}`);
    });
};

const couponController = { create, findAll, findOne, update, remove };
module.exports = couponController;
