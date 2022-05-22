//initialisation :
const c = require('./../../config_gaia.json');
const er = require('./../texte/erreur.json');
const mysql = require('mysql');
const m = require('./../texte/main.json');
let con = mysql.createConnection({
    host: c.db.host,
    user: c.db.user,
    password: c.db.password,
    database: c.db.database
});
//sauvegarde @data dans @colonne de @table selon @id
module.exports.saveByID = (table, id, data, colonne) => {
  //connect @con à la bdd
  con.connect(function (err) {
    if (err) return console.log(er[c.lang].EconDB);
    if (c.log.connect) console.log(m[c.lang].connect[0] + c.db.database + m[c.lang].connect[1] + c.db.host);//msg de connection
  });
  con.query("UPDATE " + table + " SET " + colonne + " = '" + data + "' WHERE id = '" + id + "'", function (err, result) {
    if (err) throw err;
  });
  con.end();
}