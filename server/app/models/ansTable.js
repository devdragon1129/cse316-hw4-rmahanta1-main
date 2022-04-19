const sql = require("./db.js");

// constructor
const ansTable = function(Answer) {
  this.text = Answer.text;
  this.ans_by = Answer.ans_by; 
  this.ans_date_time = new Date(); 
};

ansTable.create = (newAnswer, result) => {
  sql.query("INSERT INTO ansTable SET ?", newAnswer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created ansTable: ", { aid: res.insertId, ...newAnswer });
    result(null, { aid: res.insertId, ...newAnswer });
  });
};

ansTable.findById = (aid, result) => {
  sql.query(`SELECT * FROM ansTable WHERE aid = ${aid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ansTable: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found ansTable with the id
    result({ kind: "not_found" }, null);
  });
};

ansTable.getAllByAns = (ans_by, result) => {
  let query = "SELECT * FROM answerTable";

  if (ans_by) {
    query += ` WHERE ans_by LIKE '%${ans_by}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("answerTable: ", res);
    result(null, res);
  });
};

ansTable.getAll = result => {
  sql.query("SELECT * FROM ansTable", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ansTable: ", res);
    result(null, res);
  });
};

ansTable.updateById = (aid, newAnswer, result) => {
  sql.query(
    "UPDATE ansTable SET text = ?, ans_by = ? WHERE aid = ?",
    [newAnswer.text, newAnswer.ans_by, aid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found ansTable with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated ansTable: ", { aid: aid, ...newAnswer });
      result(null, { aid: aid, ...newAnswer });
    }
  );
};

ansTable.remove = (aid, result) => {
  sql.query("DELETE FROM ansTable WHERE aid = ?", aid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found ansTable with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted ansTable with aid: ", aid);
    result(null, res);
  });
};

ansTable.removeAll = result => {
  sql.query("DELETE FROM ansTable", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} ansTable`);
    result(null, res);
  });
};

module.exports = ansTable;
