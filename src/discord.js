const con = require('./../index.js').con;
const lang = require('./../index.js').lang;
const config_d = require('./../../config_gaia.json').discord;
const er = require('./../texte/erreur.json');

//get table.data  de @d_id dans @table
module.exports.get = (table, d_id) => {
    con.query("SELECT * FROM " + table + " WHERE discord_id = '" + d_id + "'", function (err, result, fields) {
        if (err) throw err;
        if (result.length > 1) return console.log(er[lang].Mres);
        return result[0];
    });
}
//save @data dans @table a @d_id
module.exports.save = (table, d_id, data) => {
    con.query("UPDATE " + table + " SET data = " + data + " WHERE discord_id = '" + d_id + "'", function (err) {
        if (err) throw err;
    });
}
if (config_d.compte_table != "") {
    module.exports.aCompte = (d_id) => {
        con.query("SELECT * " + config_d.compte_table + " WHERE discord_id = '" + d_id + "' ORDER BY id DESC", function (err, result, fields) {
            if (err) throw err;
            if (result.length > 1) return console.log(er[lang].Mres);
            console.log(result)
            return result[0];
        });
    }
} else {
    console.log(er[lang].EdisCompte);
}
