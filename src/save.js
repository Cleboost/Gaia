const con = require('./../index.json').con;
//c'est pour quoi ?
module.exports.saveByID = (table, id, data, colonne) => {
    con.query("UPDATE "+table+" SET "+colonne+" = '"+data+"' WHERE id = '"+id+"'", function (err, result) {
        if (err) throw err;
      });
}