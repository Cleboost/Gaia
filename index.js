//fichier principale de l'API
const mysql = require('mysql');
const { writeFileSync, write, existsSync } = require('fs');

const t_erreur=require('./texte/erreur.json');
const t_main=require('./texte/main.json');

module.exports.start = () => {
  //verifie si le fichier config_api.json est existant
  if (!existsSync('./config_api.json')) {
    //sinon le creer
    writeFileSync('./config_api.json', JSON.stringify(require('./ex_config.json')));
    return console.log(t_erreur["fr"].Efile+"config_api.json !!");
    //writeFileSync('./api-sans-nom/', JSON.stringify(_data));
  };
  const config = require('./../config_api.json');
  if (t_main.lang.indexOf(config.lang)===-1) {
    return console.log("Merci de définire un langue existante "+t_main.lang)
  };
  let lang=config.lang;
  
  //recupere les donnees de connection
  let con = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  });
//connect @con à la bdd
  con.connect(function(err) {
    if (err) throw err;
    if (config.log.connect) console.log(t_main[lang].connect[0]+config.db.database+t_main[lang].connect[1]+config.db.host);//msg de connection
    module.exports = con;
  });
};


