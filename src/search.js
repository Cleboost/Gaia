//Fonction pour rechercher un @element pour @element == @data dans @table
module.exports.serachByElement = (element, data, table) => {
    let i = 0;
    try {
        do {
            if (table[i][element] === data) return i;
            i++;
        } while (i < table.lenth)
        console.log('Pas de donnée pour l\'element "' + element + '" = "' + data + '" !');
    } catch (err) {
        throw 'L\'element ' + element + ' n\'existe pas !';
    }
}
