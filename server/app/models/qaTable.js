const sql = require("./db.js");

// constructor
const qaTable = function(qaTable) {
  this.qstnId = qaTable.qstnId;
  this.ansId = qaTable.ansId;  
};

qaTable.insert = (newQA, result) => {
  sql.query("INSERT INTO qaTable SET ?", newQA, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("insertedd qaTable: ", { id: res.insertId, ...newQA });
    result(null, { id: res.insertId, ...newQA });
  });
};
qaTable.findByQIdAID = (iDS, result) => {
  sql.query("SELECT * FROM qaTables WHERE ?" , iDS, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found qaTable: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found qaTable with the id
    result({ kind: "not_found" }, null);
  });
};

qaTable.findByQId = (id, result) => {
  sql.query(`SELECT * FROM qaTable WHERE qstnId = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found qaTable: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found qaTable with the id
    result({ kind: "not_found" }, null);
  });
};

qaTable.findByAId = (id, result) => {
  sql.query(`SELECT * FROM qaTables WHERE ansId = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found qaTable: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found qaTable with the id
    result({ kind: "not_found" }, null);
  });
};

qaTable.getAll = (result) => {
  let query = "SELECT * FROM qaTables";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("qaTables: ", res);
    result(null, res);
  });
};

qaTable.remove = (id, result) => {
  sql.query("DELETE FROM qaTable WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found qaTable with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted qaTable with id: ", id);
    result(null, res);
  });
};

qaTable.removeAll = result => {
  sql.query("DELETE FROM qaTable", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} qaTable`);
    result(null, res);
  });
};

module.exports = qaTable;


