//fichier principale  de l'API
const mysql = require('mysql');
const { writeFileSync, existsSync } = require('fs');
const AsciiTable = require('ascii-table');
const t_erreur = require('./texte/erreur.json');
const t_main = require('./texte/main.json');

let tableToLog = new AsciiTable('Function Loader');
tableToLog
    .setHeading("Function", "Load");

let con, lang, connect = false;

module.exports.start = () => {
    //verifie si le fichier config_api.json est existant
    if (!existsSync('./../config_gaia.json')) {
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
        console.log(t_main[lang].connect[0] + config.db.database + t_main[lang].connect[1] + config.db.host);//msg de connection
    });
    //met fin à la connection
    con.end()
};

//export les modules de gaia :
module.exports.get = require('./src/get.js');
module.exports.discord = require('./src/discord.js');
module.exports.save = require('./src/save.js');
module.exports.search = require('./src/search.js');

function consoleLog() {
    tableToLog
        .setHeading("Function", "Load")
        .addRow('Start', "OK")
}