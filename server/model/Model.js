const connection = require('../db');


class Model {

    constructor() {
        this.db = connection;
    }

    // save into database
   save = (table,obj,callback) => {
    let sql = `INSERT INTO ${table} SET ?`;
    this.db.query(sql,obj,callback);
   }

   // read/select from table
   select = (table,obj,callback) => {
    let sql = `SELECT * FROM ${table} WHERE ?`;
    this.db.query(sql,obj,callback);
   }

   // update the items
   update = (table, fields, condition, callback) => {
    let sql = `UPDATE ${table} SET ? WHERE ?`;
    this.db.query(sql,[fields,condition],callback);
   }

   // remove items
   delete = (table, fields, callback) => {
    let sql = `DELETE FROM ${table} WHERE ?`;
    this.db.query(sql,fields,callback);
   }
}

module.exports = Model;