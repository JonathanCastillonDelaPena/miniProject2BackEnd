const db = require("../data/database");
const Product = db.products;

const create = (req, res) => {
  const data = req.body;

  if (!data.name) {
    res.status(400).send({ message: `Content cannot be empty.` });
    console.log(`\nCannot create empty Product.`);
    return;
  }

  const product = new Product({
    name: data.name,
    price: data.price,
    discount: data.discount,
    stock: data.stock,
    category: data.category,
    description: data.description,
  });

  product
    .save()
    .then((data) => {
      res.send(data);
      console.log(`\nNew Product added to the database:\n${data}`);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error while saving the Product to the database.`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError while saving the Product to the database.`);
    });
};

const findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Product.find(condition)
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({ message: `No Products found from the database.` });
        console.log(`\nNo Products found from the database.`);
      } else {
        res.send(data);
        console.log(`\nProducts from database:\n${data}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error while finding all Products from database.`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError while finding all Products from database.`);
    });
};

const findOne = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: `Cannot find Product with id=${id}` });
        console.log(`\nCannot find Product with id=${id}`);
      } else {
        res.send(data);
        console.log(`\nFOUND Product with id=${id}\n${data}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error while finding Product with id=${id}`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError while finding Product with id=${id}`);
    });
};

const update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: `Data for update cannot be empty.` });
    console.log(`\nCannot update Product with empty Data.`);
    return;
  }

  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot update Product with id=${id}`,
        });
        console.log(`\nCannot update Product with id=${id}`);
      } else {
        res.send({ message: `Product with id=${id} was updated.` });
        console.log(`\nUPDATED Product with id=${id}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Product with id=${id}`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError updating Product with id=${id}`);
    });
};

const remove = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot delete Product with id=${id}`,
        });
        console.log(`\nCannot delete Product with id=${id}`);
      } else {
        res.send({
          message: `Product with id=${id} was deleted.`,
        });
        console.log(`\nDELETED Product with id=${id}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting Product with id=${id}`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError deleting Product with id=${id}`);
    });
};

const productController = { create, findAll, findOne, update, remove };
module.exports = productController;
