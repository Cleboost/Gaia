const { existsSync, writeFileSync } = require("fs")
// Initialisation du système de langue
module.exports.startLang = () => {
    if (!existsSync('../../translate.json')) {
        writeFileSync('../../translate.json', JSON.stringify(require('../ex_lang.json')));
    } else return console.log("Votre fichier de langue a bien été chargé.");
}
// Ajoute une langue dans le fichier
module.exports.createLang = (name) => {
    if (!existsSync('../../translate.json')) return console.log("Merci d'utiliser la fonction startLang()");
    let configLang = require('../../transalte.json');
    configLang[name] = [];
}

