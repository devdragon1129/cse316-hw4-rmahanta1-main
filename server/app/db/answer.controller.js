const Answer = require("../models/ansTable.js");
const QAModel = require("../models/qaTable.js");
// Create and Save a new Answer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Answer
  const answer = new Answer({
    text: req.body.text,
    ans_by: req.body.ans_by, 
    ans_date_time: new Date()
  });
  console.log("CreateAnswerBody", req.params.qid);
  // Save Answer in the database
  Answer.create(answer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Answer."
      });
    else {
      
      let qa = new QAModel({
        qstnId: req.params.qid,
        ansId: data.aid
      })
      QAModel.insert(qa, (err, result) => {
        res.send(data);
      })
      
    }
  });
};

// Retrieve all Answers from the database (with condition).
exports.findAll = (req, res) => {
  Answer.getAll( (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Answers."
      });
    else res.send(data);
  });
};
exports.findByAns = (req, res) => {
  const ans_by = req.query.ans_by;
  Answer.getAllByAns(ans_by, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Questions."
      });
    else res.send(data);
  });
};
// Find a single Answer by Id
exports.findOne = (req, res) => {
  Answer.findById(req.params.aid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Answer with id ${req.params.aid}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Answer with id " + req.params.aid
        });
      }
    } else res.send(data);
  });
};

// Update a Answer identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Answer.updateById(
    req.params.aid,
    new Answer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Answer with id ${req.params.aid}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Answer with id " + req.params.aid
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Answer with the specified id in the request
exports.delete = (req, res) => {
  Answer.remove(req.params.aid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Answer with id ${req.params.aid}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Answer with id " + req.params.aid
        });
      }
    } else res.send({ message: `Answer was deleted successfully!` });
  });
};

// Delete all Answers from the database.
exports.deleteAll = (req, res) => {
  Answer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Answers."
      });
    else res.send({ message: `All Answers were deleted successfully!` });
  });
};
