const Model = require('./Model');

class FileModel extends Model {
   
    constructor(){
        super();
    }
   
    readAll = (table,obj,callback) => {
        let sql = `SELECT * from ${table} LIMIT ?`;
        this.db.query(sql,[obj],callback);
    }
   

   
}

module.exports = FileModel;