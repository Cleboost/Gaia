const con = require('./../index.js').con;
//fonction pour recup une @table de la bdd
module.exports.table = (table) => {
    con.query("SELECT * FROM " + table + " ORDER BY id DESC", function (err, result, fields) {
        if (err) throw err;
        return result;
    });
}