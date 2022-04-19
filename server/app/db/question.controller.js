const Question = require("../models/questionTable.js");
const Tag = require("../models/tagTable.js");
const QTModel = require("../models/qtTable.js");
const QAModel = require("../models/qaTable.js");
const Answer = require("../models/ansTable.js");

// const { default: TagsPage } = require("../../../client/src/components/TagsPage.js");
// Create and Save a new Question
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Question
  const question = new Question({
    title: req.body.title,
    text: req.body.text,
    asked_by: req.body.asked_by,
    ask_date_time : new Date(),
    views: 0
  });
  let qid = 0
  // Save Question in the database
  Question.create(question, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Question."
      });
    else {
      qid = data.qid;
      const bodyTags = req.body.tags;
      let vTags = bodyTags.split(" ");
      vTags.map(item =>{
        const tag = new Tag({
          name : item
        });

        Tag.getAllByName(item, (err, data) => {
          if(data.length > 0){
            const QTA = new QTModel({
              qstnId: qid,
              tagId: data[0].tid
            });
            QTModel.insert(QTA, (err, data) => {
              if (err) console.log('qt exists');                
            });
          } else {
            Tag.create(tag, (err, data) => {
              if (err) console.log('tag exists');       
              const QTA = new QTModel({
                qstnId: qid,
                tagId: data.tid
              });
              QTModel.insert(QTA, (err, data) => {
                if (err) console.log('qt exists');                
              });
            });
          }
        });        
      });  
      res.send(data);
    }
  });  
};

// Retrieve all Questions from the database (with condition).
exports.findByAsk = (req, res) => {
  const asked_by = req.query.asked_by;

  Question.getAllByAsk(asked_by, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Questions."
      });
    else res.send(data);
  });
};

exports.findAll = async (req, res) => {
  Question.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Questions."
      });
    else {
      res.send(data);      
    }    
  });  
};

exports.findByTitle = (req, res) => {
  const title = req.query.title;

  Question.getAllByTitle(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Questions."
      });
    else res.send(data);
  });
};

// Find a single Question by Id
exports.findOne = (req, res) => {
  Question.findById(req.params.qid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Question with id ${req.params.qid}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Question with id " + req.params.qid
        });
      }
    } else {
      res.send(data);
      Question.updateViewsById(req.params.qid, (err, result) => {        
        
      })
    }
  });
};

// Update a Question identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Question.updateById(
    req.params.qid,
    new Question(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Question with id ${req.params.qid}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Question with id " + req.params.qid
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
  Question.remove(req.params.qid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Question with id ${req.params.qid}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Question with id " + req.params.qid
        });
      }
    } else res.send({ message: `Question was deleted successfully!` });
  });
};

// Delete all Questions from the database.
exports.deleteAll = (req, res) => {
  Question.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Questions."
      });
    else res.send({ message: `All Questions were deleted successfully!` });
  });
};
