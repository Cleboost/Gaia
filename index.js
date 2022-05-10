//fichier principale  de l'API
const mysql = require('mysql');
const { writeFileSync, existsSync } = require('fs');
const t_erreur = require('./texte/erreur.json');
const t_main = require('./texte/main.json');

let con, lang, connect = false;

module.exports.start = () => {
    //verifie si le fichier config_api.json est existant
    if (!existsSync('./config_gaia.json')) {
        //sinon le creer
        writeFileSync('./config_gaia.json', JSON.stringify(require('./ex_config.json')));
        return console.log(t_erreur["fr"].Efile + "config_gaia.json !!");
    };
    //verif si une langue est def
    const config = require('./../config_gaia.json');
    if (t_main.lang.indexOf(config.lang) === -1) {
        return console.log("Merci de définire un langue existante " + t_main.lang)
    };
    lang = config.lang;
    /*if (config.schema[0] == undefined) {
        return console.log(t_erreur[lang].Esche); //schem vide
    }*/
    //recupere les donnees de connection
    con = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    });
    //connect @con à la bdd
    con.connect(function (err) {
        if (err) return console.log(t_erreur[lang].EconDB);
        if (config.log.connect) console.log(t_main[lang].connect[0] + config.db.database + t_main[lang].connect[1] + config.db.host);//msg de connection
        connect = true;
    });
};
// Exporte de toutes les fonctions de l'api
if (connect) {
    console.log("exports : ok");
    module.exports = {
        get: require('./src/get.js'),
        search: require('./src/search.js'),
        discord: require('./src/discord.js'),
        save: require('./src/save.js'),
        con: con, //const con = require('./../index.json').con;
        lang: lang //const lang = require('./../index.json').lang;
    };
}