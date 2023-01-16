const {mysqld} = require('/res/js/mysql/mysqld')

/***
 * 对应的那个
 * @returns {Promise<unknown>}
 */
function getinterjishi (){
    let sqldata = `select * from interestclass where residuetime<>0`;
    return mysqld(sqldata).then((e)=>{
        console.log()
    })
}


module.exports = {
    getinterjishi,
}