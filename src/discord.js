const con = require('./../index.js').con;
const lang = require('./../index.js').lang;
const config_d = require('./../../config_gaia.json').discord;
const er = require('./../texte/erreur.json');

//get @d_id dans @table
module.exports.get = (table, d_id) => {
    con.query("SELECT * FROM " + table + " WHERE discord_id = '" + d_id + "'", function (err, result, fields) {
        if (err) throw err;
        if (result.length > 1) return console.log(er[lang].Mres);
        return result[0];
    });
};
//save @data dans @table a @d_id
module.exports.save = (table, d_id, data, dt_col="data") => {
    con.query("UPDATE " + table + " SET "+dt_col+" = " + data + " WHERE discord_id = '" + d_id + "'", function (err) {
        if (err) throw err;
    });
};
if (config_d.compte_table != "") {
    module.exports.aCompte = (d_id) => {
        return _aCompte(d_id);
    }
    //recupere le compte de @d_id dans @config_d.compte_table
    module.exports.getCompte = (d_id) => {
        if (!_aCompte(d_id)) return false;
        con.query("SELECT * FROM " + config_d.compte_table + " WHERE discord_id = '" + d_id + "'", function (err, result, fields) {
            if (err) throw err;
            if (result.length > 1) return console.log(er[lang].Mres);
            return result[0];
        });
    };
} else {
    console.log(er[lang].EdisCompte);
};
//revenoi true si il @d_id a un compte sinon false
function _aCompte(d_id) {
    con.query("SELECT * " + config_d.compte_table + " WHERE discord_id = '" + d_id + "'", function (err, result, fields) {
        if (err) throw err;
        if (result.length > 1) return console.log(er[lang].Mres);
        console.log(d_id+" : "+result);
        return true;
    });
}