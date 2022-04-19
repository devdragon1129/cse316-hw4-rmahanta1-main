const Tag = require("../models/tagTable.js");

// Create and Save a new Tag
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tag
  const tag = new Tag({
    name: req.body.name    
  });

  // Save Tag in the database
  Tag.create(tag, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tag."
      });
    else res.send(data);
  });
};

// Retrieve all Tags from the database (with condition).
exports.findAllByName = (req, res) => {
  const name = req.query.name;

  Tag.getAllByName(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tags."
      });
    else res.send(data);
  });
};

// Find a single Tag by Id
exports.findOne = (req, res) => {
  Tag.findById(req.params.tid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tag with tid ${req.params.tid}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tag with tid " + req.params.tid
        });
      }
    } else res.send(data);
  });
};

// find all published Tags
exports.findAll = (req, res) => {
  Tag.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tags."
      });
    else {
      res.send(data);
    }
  });
};

// Update a Tag identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Tag.updateById(
    req.params.tid,
    new Tag(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tag with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tag with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tag with the specified id in the request
exports.delete = (req, res) => {
  Tag.remove(req.params.tid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tag with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tag with id " + req.params.id
        });
      }
    } else res.send({ message: `Tag was deleted successfully!` });
  });
};

// Delete all Tags from the database.
exports.deleteAll = (req, res) => {
  Tag.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Tags."
      });
    else res.send({ message: `All Tags were deleted successfully!` });
  });
};
