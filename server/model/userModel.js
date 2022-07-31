const connection = require('../db');

class UserModel {
    constructor(){
        this.db = connection;
    }
   
   // insert items into table
   insert = (table,obj,callback) => {
    let sql = `INSERT INTO ${table} SET ?`;
    this.db.query(sql,obj,callback);
   }

   // read/select from table
   select = (table,obj,callback) => {
    let sql = `SELECT * FROM ${table} WHERE ?`;
    this.db.query(sql,obj,callback);
   }
}

module.exports = UserModel;