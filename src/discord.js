con = require('index.json').con;
module.exports.get = (table, d_id) => {
    con.query("SELECT * FROM `"+table+" WHERE discord_id = '"+d_id+"'   ", function (err, result, fields) {
        if (err) throw err;
        return result[0];
    });
}