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
//fonction pour recup une @table de la bdd
module.exports.table = (table) => {
    con.query("SELECT * FROM " + table + " ORDER BY id DESC", function (err, result, fields) {
        if (err) throw err;
        return result;
    });
}