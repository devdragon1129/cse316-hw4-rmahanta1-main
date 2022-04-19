module.exports = app => {
  const question = require("../db/question.controller.js");
  const answer = require("../db/answer.controller.js");
  const tag = require("../db/tag.controller.js");
  var router = require("express").Router();
  // Create a new Tutorial
  router.post("/question/addquestion", question.create);
  router.post("/answer/postanswer/:qid", answer.create);
  router.post("/tag/addtag", tag.create);

  router.get("/question/select/:qid", question.findOne);
  router.get("/tag/select/:tid", tag.findOne);
  router.get("/answer/select:aid", answer.findOne);

  router.get("/question/getAllquestions", question.findAll);
  router.get("/allAnswers", answer.findAll);
  router.get("/tag/gettags", tag.findAll);
  router.get("/questionByAsk", question.findByAsk);
  router.get("/questionByTitle", question.findByTitle);
  router.get("/answerByAns", answer.findByAns);

  router.delete("/:qid", question.delete);
  router.delete("/:tid", tag.delete);
  router.delete("/:aid", answer.delete);

  router.put("/:qid", question.update);
  router.put("/:tid", tag.update);
  router.put("/:aid", answer.update);

  app.use('/api/', router);
};
