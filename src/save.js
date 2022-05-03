const con = require("..")
//c'est pour quoi ?
module.exports.saveByID = (table, id, data, colonne) => {
    con.query("UPDATE "+table+" SET "+colonne+" = '"+data+"' WHERE id = '"+id+"'");
}
//ok