con = require('index.json').con;
//get @table en fonction de @d_id
module.exports.get = (table, d_id) => {
    con.query("SELECT * FROM "+table+" WHERE discord_id = '"+d_id+"'   ", function (err, result, fields) {
        if (err) throw err;
        return result[0];
    });
}
//save @data dans @table a @d_id
module.exports.save = (table, d_id, data) => {
    con.query("UPDATE "+table+" SET data = "+data+" WHERE discord_id = '"+d_id+"'   ", function (err, result, fields) {
        if (err) throw err;
        return result[0];
    });
}