const db = require("../data/database");
const Buyer = db.buyers;

const create = (req, res) => {
  const data = req.body;

  if (Object.entries(data).length === 0) {
    res.status(400).send({ message: `Content cannot be empty.` });
    console.log(`\nCannot create empty Buyer.`);
    return;
  }

  const buyer = new Buyer({
    username: data.username,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    profilePicLink: data.profilePicLink,
    email: data.email,
    mobileNumber: data.mobileNumber,
    address: data.address,
    gender: data.gender,
    birthDate: data.birthDate,
    status: data.status,
  });

  buyer
    .save()
    .then((data) => {
      res.send(data);
      console.log(`\nNew Buyer added to the database:\n${data}`);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error while saving the Buyer to the database.`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError while saving the Buyer to the database.`);
    });
};

const findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Buyer.find(condition)
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: `No Buyers found from the database.` });
        console.log(`\nNo Buyers found from the database.`);
      } else {
        res.send(data);
        console.log(`\nBuyers from database:\n${data}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error while finding all Buyers from database.`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError while finding all Buyers from database.`);
    });
};

const findOne = (req, res) => {
  const id = req.params.id;

  Buyer.findById(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: `Cannot find Buyer with id=${id}` });
        console.log(`\nCannot find Buyer with id=${id}`);
      } else {
        res.send(data);
        console.log(`\nFOUND Buyer with id=${id}\n${data}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error while finding Buyer with id=${id}`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError while finding Buyer with id=${id}`);
    });
};

const update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: `Data for update cannot be empty.` });
    console.log(`\nCannot update Buyer with empty Data.`);
    return;
  }

  const id = req.params.id;

  Buyer.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot update Buyer with id=${id}`,
        });
        console.log(`\nCannot update Buyer with id=${id}`);
      } else {
        res.send({ message: `Buyer with id=${id} was updated.` });
        console.log(`\nUPDATED Buyer with id=${id}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Buyer with id=${id}`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError updating Buyer with id=${id}`);
    });
};

const remove = (req, res) => {
  const id = req.params.id;

  Buyer.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot delete Buyer with id=${id}`,
        });
        console.log(`\nCannot delete Buyer with id=${id}`);
      } else {
        res.send({
          message: `Buyer with id=${id} was deleted.`,
        });
        console.log(`\nDELETED Buyer with id=${id}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting Buyer with id=${id}`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError deleting Buyer with id=${id}`);
    });
};

const buyerController = { create, findAll, findOne, update, remove };
module.exports = buyerController;
