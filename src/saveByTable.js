const con = require("..")
//c'est pour quoi ?
module.exports.saveByTable = (indexUser, data) => {
    con.query("UPDATE `compte_user` SET `id`='',`discord_id`='',`data`='"+data+"' WHERE "+indexUser);
}
//ok