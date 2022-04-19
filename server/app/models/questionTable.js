const sql = require("./db.js");
let moment = require("moment");
var async = require("async");
// constructor
const questionTable = function(question) {
  this.title = question.title;
  this.text = question.text;
  this.asked_by = question.asked_by;
  this.ask_date_time = new Date();
  this.views = 0;
};

questionTable.create = (newQuestion, result) => {
  sql.query("INSERT INTO questionTable SET ?", newQuestion, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created questionTable: ", { qid: res.insertId, ...newQuestion });
    result(null, { qid: res.insertId, ...newQuestion });
  });
};

questionTable.findById = (qid, result) => {
  sql.query(`SELECT * FROM questionTable WHERE qid = ${qid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found questionTable: ", res[0]);
      let configs = res[0];
      sql.query(`SELECT anstable.text, anstable.ans_by, anstable.ans_date_time from qatable JOIN anstable ON qatable.ansId = anstable.aid WHERE qatable.qstnId = '${configs.qid}'`, (err, data) => {
        if (err) return result(err);
        configs = { ...configs, answers: data};
        console.log("AAAA:", configs); 
        return result(null, configs);   
      });        
    }
    // not found questionTable with the id
    // result({ kind: "not_found" }, null);
  });
};

questionTable.getAllByTitle = (title, result) => {
  let query = "SELECT * FROM questionTable";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("questionTable: ", res);
    result(null, res);
  });
};

questionTable.getAllByAsk = (asked_by, result) => {
  let query = "SELECT * FROM questionTable";

  if (asked_by) {
    query += ` WHERE asked_by LIKE '%${asked_by}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("questionTable: ", res);
    result(null, res);
  });
};

questionTable.getAll = result => {
  sql.query("Select questiontable.*, COUNT(qatable.id) as answerCnt from questiontable LEFT OUTER JOIN qatable ON qatable.qstnId = questiontable.qid GROUP BY questiontable.qid", (err, res) => {
  if (err) {
      console.log("error: ", err);
      result(null, err);      
      }
    let configs = [];
    async.forEachOf(res, (value, key, callback) => {
      sql.query(`SELECT tagtable.tid, tagtable.name from qttable JOIN tagtable ON qttable.tagId = tagtable.tid WHERE qttable.qstnId = '${value.qid}'`, (err, data) => {
        if (err) return callback(err)
        try{
          configs[key] = { ...value, tags: data};                    
        } catch(e){
          return callback(e);
        }
        callback();
      })      
    }, err => {
        if (err) console.error(err.message);
        result(null, configs);        
    });
  });
};

questionTable.updateViewsById = (qid, result) => {
  sql.query(
    `UPDATE questionTable SET views = views + 1 WHERE qid = '${qid}'`,    
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found questionTable with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Views questionTable: ", { qid: qid});
      
      result(null, { qid: qid });
    }
  );
};

questionTable.updateById = (qid, newQuestion, result) => {
  sql.query(
    "UPDATE questionTable SET title = ?, text = ?, asked_by = ? WHERE qid = ?",
    [newQuestion.title, newQuestion.text, newQuestion.asked_by, qid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found questionTable with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated questionTable: ", { qid: qid, ...newQuestion });
      result(null, { qid: qid, ...newQuestion });
    }
  );
};

questionTable.remove = (qid, result) => {
  sql.query("DELETE FROM questionTable WHERE qid = ?", qid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found questionTable with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted questionTable with qid: ", qid);
    result(null, res);
  });
};

questionTable.removeAll = result => {
  sql.query("DELETE FROM questionTable", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} questionTable`);
    result(null, res);
  });
};

module.exports = questionTable;