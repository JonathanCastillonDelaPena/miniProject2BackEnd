const db = require("../data/database");
const Cart = db.carts;

const create = (req, res) => {
  const data = req.body;

  if (Object.entries(data).length === 0) {
    res.status(400).send({ message: `Content cannot be empty.` });
    console.log(`\nCannot create empty Cart.`);
    return;
  }

  const cart = new Cart({
    buyer: data.buyer,
    appliedCoupon: data.appliedCoupon,
    products: data.products,
    rawTotal: data.rawTotal,
    finalTotal: data.finalTotal,
  });

  cart
    .save()
    .then((data) => {
      res.send(data);
      console.log(`\nNew Cart added to the database:\n${data}`);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error while saving the Cart to the database.`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError while saving the Cart to the database.`);
    });
};

const findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Cart.find(condition)
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: `No Carts found from the database.` });
        console.log(`\nNo Carts found from the database.`);
      } else {
        res.send(data);
        console.log(`\nCarts from database:\n${data}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error while finding all Carts from database.`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError while finding all Carts from database.`);
    });
};

const findOne = (req, res) => {
  const id = req.params.id;

  Cart.findById(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: `Cannot find Cart with id=${id}` });
        console.log(`\nCannot find Cart with id=${id}`);
      } else {
        res.send(data);
        console.log(`\nFOUND Cart with id=${id}\n${data}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error while finding Cart with id=${id}`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError while finding Cart with id=${id}`);
    });
};

const update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: `Data for update cannot be empty.` });
    console.log(`\nCannot update Cart with empty Data.`);
    return;
  }

  const id = req.params.id;

  Cart.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot update Cart with id=${id}`,
        });
        console.log(`\nCannot update Cart with id=${id}`);
      } else {
        res.send({ message: `Cart with id=${id} was updated.` });
        console.log(`\nUPDATED Cart with id=${id}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Cart with id=${id}`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError updating Cart with id=${id}`);
    });
};

const remove = (req, res) => {
  const id = req.params.id;

  Cart.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot delete Cart with id=${id}`,
        });
        console.log(`\nCannot delete Cart with id=${id}`);
      } else {
        res.send({
          message: `Cart with id=${id} was deleted.`,
        });
        console.log(`\nDELETED Cart with id=${id}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting Cart with id=${id}`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError deleting Cart with id=${id}`);
    });
};

const cartController = { create, findAll, findOne, update, remove };
module.exports = cartController;
