/***
 * 传入对应的 openid 就是加载到末尾的东西
 * 前面的数据随机的生成对应的信息
 *
 *
 * @returns {Promise<unknown>}
 */
async function tokenverificationcode(){
    return  new Promise((resolve,reject)=>{
        let list = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        let listshu = ['0','1','2','3','4','5','6','7','8','9']
        let randownshu =  Math.floor((Math.random()*100)+1);
    })
}


module.exports = {
    tokenverificationcode,

}