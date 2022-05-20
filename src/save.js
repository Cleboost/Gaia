//initialisation :
const c = require('./../../config_gaia.json');
const er = require('./../texte/erreur.json');
const mysql = require('mysql');
const m = require('./../texte/main.json');
con = mysql.createConnection({
    host: c.db.host,
    user: c.db.user,
    password: c.db.password,
    database: c.db.database
});
//c'est pour quoi ?
module.exports.saveByID = (table, id, data, colonne) => {
  con.query("UPDATE " + table + " SET " + colonne + " = '" + data + "' WHERE id = '" + id + "'", function (err, result) {
    if (err) throw err;
  });
}