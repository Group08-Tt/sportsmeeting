/***
 *
 * @param number 是对应的页数
 * @param navigation  是对应的 图片 还是集合   0是图片   1是集合图片
 * @param neirong  是对应的搜索的内容 信息
 * @returns {string}
 */
const saiurl = function(number,navigation,neirong){
    let  url = ""
    if (number>1){
        if (navigation == 0){
            url = "https://www.ivsky.com/search.php?q="+ encodeURIComponent(neirong)+"&page="+number
        }else{
            url = "https://www.ivsky.com/search.php?q="+ encodeURIComponent(neirong)+"&show=all"+"&page="+number
        }
    }else{
        if (navigation == 0){
            url = "https://www.ivsky.com/search.php?q="+ encodeURIComponent(neirong)
        }else{
            url = "https://www.ivsky.com/search.php?q="+ encodeURIComponent(neirong)+"&show=all"
        }
    }
    return url;
}


module.exports = {
    saiurl
}