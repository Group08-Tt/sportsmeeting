/***
 * 随机生成对应的多少为数
 * @param place 他的位数
 * @returns {string} 返回的是对应的字符串数
 */
function random_number(place) {
    var code = "";
    for (var i = 0; i < place; i++) {
        var radom = Math.floor(Math.random() * 10);
        code += radom;
    }
    return code;
}


module.exports = {
    random_number
}