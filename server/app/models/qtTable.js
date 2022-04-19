const sql = require("./db.js");

// constructor
const qtTable = function(QT) {
  this.qstnId = QT.qstnId;
  this.tagId = QT.tagId;  
};

qtTable.insert = (newQA, result) => {
  console.log("NEWQA:", newQA);
  sql.query("INSERT INTO qtTable SET ?", newQA, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("insertedd qtTable: ", { id: res.insertId, ...newQA });
    result(null, { id: res.insertId, ...newQA });
  });
};

qtTable.findByQIdTID = (iDS, result) => {
  sql.query("SELECT * FROM qtTable WHERE ?" , iDS, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found qtTable: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found qtTable with the id
    result({ kind: "not_found" }, null);
  });
};

qtTable.findByQId = (qid, result) => {
  sql.query(`SELECT * FROM qtTable WHERE qstnId = ${qid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found qtTable: ", res);
      result(null, res);
      return;
    }

    // not found qtTable with the id
    result({ kind: "not_found" }, null);
  });
};

qtTable.findByTId = (tid, result) => {
  sql.query(`SELECT * FROM qtTable WHERE tagId = ${tid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found qtTable: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found qtTable with the id
    result({ kind: "not_found" }, null);
  });
};

qtTable.getQuestionsByTId = (tid, result) => {
  sql.query(`SELECT * FROM qtTable WHERE tagId = ${tid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, 0);
      return;
    }

    if (res.length) {
      result(null, res.length);
      return;
    }

    // not found qtTable with the id
    result({ kind: "not_found" }, 0);
  });
};

qtTable.getAll = (result) => {
  let query = "SELECT * FROM qtTable";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("qtTable: ", res);
    result(null, res);
  });
};

qtTable.remove = (id, result) => {
  sql.query("DELETE FROM qtTable WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found qtTable with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted qtTable with id: ", id);
    result(null, res);
  });
};

qtTable.removeAll = result => {
  sql.query("DELETE FROM qtTable", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} qtTable`);
    result(null, res);
  });
};

module.exports = qtTable;