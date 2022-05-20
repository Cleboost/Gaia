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
//get @d_id dans @table
module.exports.get = (table, d_id) => {
    //connect @con à la bdd
    con.connect(function (err) {
        if (err) return console.log(er[c.lang].EconDB);
        if (c.log.connect) console.log(m[c.lang].connect[0] + c.db.database + m[c.lang].connect[1] + c.db.host);//msg de connection
    });
    con.query("SELECT * FROM " + table + " WHERE discord_id = '" + d_id + "'", function (err, result, fields) {
        if (err) throw err;
        if (result.length > 1) return console.log(er[c.lang].Mres);
        con.end();
        return result[0];
    });
};
//save @data dans @table a @d_id
module.exports.save = (table, d_id, data, dt_col = "data") => {
    //connect @con à la bdd
    con.connect(function (err) {
        if (err) return console.log(er[c.lang].EconDB);
        if (c.log.connect) console.log(m[c.lang].connect[0] + c.db.database + m[c.lang].connect[1] + c.db.host);//msg de connection
    });
    con.query("UPDATE " + table + " SET " + dt_col + " = " + data + " WHERE discord_id = '" + d_id + "'", function (err) {
        if (err) throw err;
    });
    con.end();
};
if (c.discord.compte_table != "") {
    module.exports.aCompte = (d_id) => {
        return _aCompte(d_id);
    }
    //recupere le compte de @d_id dans @config_d.compte_table
    module.exports.getCompte = (d_id) => {
        //connect @con à la bdd
    con.connect(function (err) {
        if (err) return console.log(er[c.lang].EconDB);
        if (c.log.connect) console.log(m[c.lang].connect[0] + c.db.database + m[c.lang].connect[1] + c.db.host);//msg de connection
    });
        if (!_aCompte(d_id)) return false;
        con.query("SELECT * FROM " + c.discord.compte_table + " WHERE discord_id = '" + d_id + "'", function (err, result, fields) {
            if (err) throw err;
            if (result.length > 1) return console.log(er[c.lang].Mres);
            con.end();
            return result[0];
        });
    };
} else {
    console.log(er[c.lang].EdisCompte);
};
//revenoi true si il @d_id a un compte sinon false
function _aCompte(d_id) {
    //connect @con à la bdd
    con.connect(function (err) {
        if (err) return console.log(er[c.lang].EconDB);
        if (c.log.connect) console.log(m[c.lang].connect[0] + c.db.database + m[c.lang].connect[1] + c.db.host);//msg de connection
    });
    con.query("SELECT * " + c.discord.compte_table + " WHERE discord_id = '" + d_id + "'", function (err, result, fields) {
        if (err) throw err;
        if (result.length > 1) return console.log(er[c.lang].Mres);
        console.log(d_id + " : " + result);
        con.end();
        return true;
    });
}