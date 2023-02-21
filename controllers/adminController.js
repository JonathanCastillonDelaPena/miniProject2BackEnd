const db = require("../data/database");
const Admin = db.admins;

const create = (req, res) => {
  const data = req.body;

  if (Object.entries(data).length === 0) {
    res.status(400).send({ message: `Content cannot be empty.` });
    console.log(`\nCannot create empty Admin.`);
    return;
  }

  const admin = new Admin({
    username: data.username,
    password: data.password,
  });

  admin
    .save()
    .then((data) => {
      res.send(data);
      console.log(`\nNew Admin added to the database:\n${data}`);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error while saving the Admin to the database.`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError while saving the Admin to the database.`);
    });
};

const findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Admin.find(condition)
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: `No Admins found from the database.` });
        console.log(`\nNo Admins found from the database.`);
      } else {
        res.send(data);
        console.log(`\nAdmins from database:\n${data}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error while finding all Admins from database.`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError while finding all Admins from database.`);
    });
};

const findOne = (req, res) => {
  const id = req.params.id;

  Admin.findById(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: `Cannot find Admin with id=${id}` });
        console.log(`\nCannot find Admin with id=${id}`);
      } else {
        res.send(data);
        console.log(`\nFOUND Admin with id=${id}\n${data}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error while finding Admin with id=${id}`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError while finding Admin with id=${id}`);
    });
};

const update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: `Data for update cannot be empty.` });
    console.log(`\nCannot update Admin with empty Data.`);
    return;
  }

  const id = req.params.id;

  Admin.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot update Admin with id=${id}`,
        });
        console.log(`\nCannot update Admin with id=${id}`);
      } else {
        res.send({ message: `Admin with id=${id} was updated.` });
        console.log(`\nUPDATED Admin with id=${id}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Admin with id=${id}`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError updating Admin with id=${id}`);
    });
};

const remove = (req, res) => {
  const id = req.params.id;

  Admin.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot delete Admin with id=${id}`,
        });
        console.log(`\nCannot delete Admin with id=${id}`);
      } else {
        res.send({
          message: `Admin with id=${id} was deleted.`,
        });
        console.log(`\nDELETED Admin with id=${id}`);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting Admin with id=${id}`,
      });
      console.log(`\n`);
      console.log(err);
      console.log(`\nError deleting Admin with id=${id}`);
    });
};

const adminController = { create, findAll, findOne, update, remove };
module.exports = adminController;
