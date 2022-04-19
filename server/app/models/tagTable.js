const sql = require("./db.js");

// constructor
const tagTable = function(Tag) {
  this.name = Tag.name;
};

tagTable.create = (newTag, result) => {
  sql.query("INSERT INTO tagTable SET ?", newTag, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tagTable: ", { tid: res.insertId, ...newTag });
    result(null, { tid: res.insertId, ...newTag });
  });
};

tagTable.findById = (tid, result) => {
  sql.query(`SELECT * FROM tagTable WHERE tid = ${tid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tagTable: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found tagTable with the id
    result({ kind: "not_found" }, null);
  });
};

tagTable.getAllByName = (name, result) => {
  let query = "SELECT * FROM tagTable";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tagTable: ", res);
    result(null, res);
  });
};

tagTable.getAll = result => {
  sql.query("SELECT tagTable.*, COUNT(qttable.id) as qCnt fROM tagTable  RIGHT JOIN qttable ON qttable.tagId = tagtable.tid GROUP BY tagtable.tid", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tagTable: ", res);
    result(null, res);
  });
};



tagTable.updateById = (tid, newTag, result) => {
  sql.query(
    "UPDATE tagTable SET name = ? WHERE tid = ?",
    [newTag.name, tid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found tagTable with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tagTable: ", { tid: tid, ...newTag });
      result(null, { tid: tid, ...newTag });
    }
  );
};

tagTable.remove = (tid, result) => {
  sql.query("DELETE FROM tagTable WHERE tid = ?", tid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found tagTable with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tagTable with tid: ", tid);
    result(null, res);
  });
};

tagTable.removeAll = result => {
  sql.query("DELETE FROM tagTable", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tagTable`);
    result(null, res);
  });
};

module.exports = tagTable;