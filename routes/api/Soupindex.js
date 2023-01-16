const express = require('express');
const router = express.Router();

/***
 * 主页的对应的信息，初始化操作
 */
router.get('/allindexdatalist', async function (request, response, next) {
    let datalist = [
            {
              title:"轮播图",
              id:"swiper",
              data:[
                  {
                      id:1,
                      imageurl:"http://127.0.0.1:3000/shoupimg/lunbotu/1.jpg",
                      path_url:"https://www.baidu.com",
                  },{
                      id:2,
                      imageurl:"http://127.0.0.1:3000/shoupimg/lunbotu/2.jpg",
                      path_url:"https://www.baidu.com",
                  },{
                      id:3,
                      imageurl:"http://127.0.0.1:3000/shoupimg/lunbotu/3.jpg",
                      path_url:"https://www.baidu.com",
                  },{
                      id:4,
                      imageurl:"http://127.0.0.1:3000/shoupimg/lunbotu/4.jpg",
                      path_url:"https://www.baidu.com",
                  },
              ]
            },
        {
            title:"导航栏信息",
            id:"nav",
            data: [
                [{
                    name: '天猫新品',
                    icon: '11.png'
                },
                    {
                        name: '今日爆款',
                        icon: '9.png'
                    }, {
                    name: '天猫国际',
                    icon: '17.png'
                }, {
                    name: '饿了么',
                    icon: '6.png'
                }, {
                    name: '天猫超市',
                    icon: '11.png'
                }, {
                    name: '分类',
                    icon: '2.png'
                }, {
                    name: '天猫美食',
                    icon: '3.png'
                }, {
                    name: '阿里健康',
                    icon: '12.png'
                }, {
                    name: '口碑生活',
                    icon: '7.png'
                }
                ],
                [{
                    name: '充值中心',
                    icon: '8.png'
                },
                    {
                        name: '机票酒店',
                        icon: '10.png'
                    }, {
                    name: '金币庄园',
                    icon: '18.png'
                }, {
                    name: '阿里拍卖',
                    icon: '15.png'
                }, {
                    name: '淘宝吃货',
                    icon: '16.png'
                }, {
                    name: '闲鱼',
                    icon: '4.png'
                }, {
                    name: '会员中心',
                    icon: '6.png'
                }, {
                    name: '造点新货',
                    icon: '13.png'
                }, {
                    name: '土货鲜食',
                    icon: '14.png'
                }
                ]
            ],
        },
        {
            title:"商品的导航的信息",
            id:"nav",
            data:[

            ]
        }
    ]

    response.json(datalist);
});
module.exports = router;