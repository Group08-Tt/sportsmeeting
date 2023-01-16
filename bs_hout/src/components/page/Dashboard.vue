<template>
    <div>
        <el-row :gutter='24'>
            <el-col :span='24'>
                <el-row :gutter='20' class='mgb20'>
					
                    <el-col :span='8'>
                        <el-card shadow='hover' :body-style="{padding: '0px'}">
                            <div class='grid-content grid-con-1'>
                                <i class='el-icon-lx-people grid-con-icon'></i>
                                <div class='grid-cont-right'>
                                    <div class='grid-num'>{{ projectNumber }}</div>
                                    <div>运动员</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
					
                    <el-col :span='8'>
                        <el-card shadow='hover' :body-style="{padding: '0px'}">
                            <div class='grid-content grid-con-2'>
                                <i class='el-icon-lx-notice grid-con-icon'></i>
                                <div class='grid-cont-right'>
                                    <div class='grid-num'>{{ totalNumber }}</div>
                                    <div>比赛项目</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
					
					<el-col :span='8'>
					    <el-card shadow='hover' :body-style="{padding: '0px'}">
					        <div class='grid-content grid-con-1'>
					            <i class='el-icon-lx-people grid-con-icon'></i>
					            <div class='grid-cont-right'>
					                <div class='grid-num'>{{ totalAmt }}</div>
					                <div>微信用户</div>
					            </div>
					        </div>
					    </el-card>
					</el-col>
					
					
                </el-row>
            </el-col>
        </el-row>
        <div style='height: auto;'>
            <el-row :gutter='24'>
                <el-col :span='24'>
                    <schart class='schart' canvasId='line' :options='options2'></schart>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Schart from 'vue-schart';

import request from '@/utils/request';

export default {
    name: 'dashboard',
    data() {
        return {
            projectNumber: 0,
            totalAmt: 0,
            totalNumber: 0,
            options2: {
                type: 'line',
                title: {
                    text: '最近7日捐赠金额'
                },
                bgColor: '#fbfbfb',
                labels: [],
                datasets: [
                    {
                        label: '金额',
                        data: []
                    }
                ]
            }
        };
    },
    components: { Schart },
    computed: {},
    created() {
        this.initChart();
    },
    methods: {
        initChart() {
            request.get('/bs/bsgwyy/indexparameter').then((res) => {
				console.log(res)
				this.projectNumber  = res.athletesuserinfo;
				this.totalAmt =   res.wxusercount;
				this.totalNumber =res.gameuserdata;
				
				
				
                // if (200 !== code) {
                //     this.$message.error('加载数据失败!');
                //     return;
                // }
                // data.forEach(item => {
                //     this.options2.labels.push(item.data);
                //     this.options2.datasets[0].data.push(item.amt);
                // });

                // console.log(this.options2);

            });
        },
        // initProjectNumber() {
        //     request.get('/admin/sys/WelfareInfo/count').then(({ code, msg, data }) => {
        //         if (data !== null && data !== undefined) {
        //             this.projectNumber = data.count;
        //         }
        //     });
        // },
        // initAmtInfo() {
        //     request.get('/admin/sys/DonationRecord/count').then(({ code, msg, data }) => {
        //         if (data !== null && data !== undefined) {
        //             this.totalAmt = data.AMT === null ? 0 : data.AMT;
        //             this.totalNumber = data.COUNT;
        //         }
        //     });
        // }
    }
};
</script>


<style scoped>

.schart {
    width: 100%;
    height: 100%;
}

.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
