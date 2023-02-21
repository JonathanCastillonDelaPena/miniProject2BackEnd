const db = require("../data/database");
const Test = db.tests;

const create = (req, res) => {
  const data = req.body;
  // Validate request
  if (Object.entries(data).length === 0) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Test
  const test = new Test({
    name: data.name,
    number: data.number,
    isValid: data.isValid,
  });

  // Save Test in the database
  test
    .save()
    .then((data) => {
      res.send(`Added a new record\n${data}`);
      console.log(`Added a new record\n${data}`);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Test.",
      });
    });
};

const findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Test.find(condition)
    .then((data) => {
      res.send(data);
      console.log(`Data retrieved:\n${data}`);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Test.",
      });
    });
};

const findOne = (req, res) => {};

const update = (req, res) => {};

const remove = (req, res) => {};

const removeAll = (req, res) => {};

const testGet = (req, res) => {
  res.json({ message: "Test Route..." });
};

const testController = {
  create,
  findAll,
  findOne,
  update,
  remove,
  removeAll,
  testGet,
};
module.exports = testController;
