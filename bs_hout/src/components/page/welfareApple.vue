<template>
    <div>
        <div class='crumbs'>
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item>
                    <i class='el-icon-lx-cascades'></i> 用户
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='container'>
            <div class='handle-box'>
				<el-select v-model="collagesuperr" placeholder="请选择">
					<el-option v-for="item in options" :key="item.college" :label="item.college" :value="item.college"></el-option>
				</el-select>
				
				<el-select v-model="signsuperr" placeholder="请选择">
					<el-option v-for="item in optionssign" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
				
				
					<el-button type='primary' icon='el-icon-search' @click='Excelbatchaddbutton'>导出下列信息</el-button>
					<el-button type='primary' icon='el-icon-search' @click='Excelcoller'>导出学院表</el-button>
            </div>
            <el-table
                :data='tableData'
                border
                class='table'
                ref='multipleTable'
                header-cell-class-name='table-header'
            >
                <el-table-column type='selection' width='55' align='center'></el-table-column>
                <el-table-column prop='studentid' label='学号'  align='center'></el-table-column>
				<el-table-column prop='email' label='邮箱'  align='center'></el-table-column>
                <el-table-column prop='nickName' label='名字'  align='center'></el-table-column>
                <el-table-column prop='college' label='学院'  align='center'></el-table-column>
                <el-table-column prop='address' width='250' label='定位'  align='center'></el-table-column>
				<el-table-column label='性别'>
				    <template slot-scope='scope'>
				        <span v-if='scope.row.gender===1'>男</span>
				        <span v-if='scope.row.gender===2'>女</span>
				    </template>
				</el-table-column>
                <el-table-column prop='iphonenumber' label='手机号'  align='center'></el-table-column>
				<el-table-column label='是否签到' align='center'>
				    <template slot-scope='scope'>
				        <span v-if='scope.row.sign===0'>否</span>
				        <span v-if='scope.row.sign===1'>是</span>
				    </template>
				</el-table-column>
            </el-table>
            <div class='pagination'>
                <el-pagination
                    background
                    layout='total, prev, pager, next'
                    :current-page='query.page'
                    :page-size='query.limit'
                    :total='total'
                    :page-count='pageTotal'
                    @current-change='handlePageChange'
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import welfareAppleApi from '@/api/welfareAppleApi';
import { pageCount } from '@/utils/page';
import httpconfig from '@/config.js'

export default {
    name: 'welfareType',
    data() {
        return {
			collagesuperr:"",
			signsuperr:"",
			options: [],
			optionssign: [{
				value: 3,
				label: '全部'
			},{
				value: 0,
				label: '未签到'
			}, {
				value: 1,
				label: '已签到'
			}],
			value: '',
            query: {
                userName: '',
                page: 1,
                limit: 20,
				college:0, //什么学院的
				sign:3, //是否是签名了 的
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            total: 0
        };
    },
	watch:{
		collagesuperr:function(){
			this.query.college = this.collagesuperr;
			this.getData();
		},
		signsuperr:function(){
			this.query.sign = this.signsuperr;
			this.getData();
		},
	},
    created() {
        this.getData();
    },
		//导出数据
    methods: {
		/**
		 * 按照学院导出
		 * **/
		Excelcoller(){
			welfareAppleApi.Excelcollage().then((res) => {
				if(res.code == 1){
					window.open( httpconfig.httpconfig+ res.url,"_blank")
					 this.$message.success(res.msg);
					return ;
				}
				this.$message.error('导出失败!');
			});
		},
		/**
		 * 导出对应的全部信息
		**/
		Excelbatchaddbutton(){
			console.log(this.query) //httpconfig
			welfareAppleApi.Exceldouloud(this.query).then((res) => {
				if(res.code == 1){
					window.open( httpconfig.httpconfig+ res.url,"_blank")
					 this.$message.success(res.msg);
					return ;
				}
				this.$message.error('导出失败!');
			});
		},
        // 获取 easy-mock 的模拟数据
        getData() {
            welfareAppleApi.list(this.query).then((res) => {
				console.log(res)
                if (1 !== res.code) {
                    this.$message.error('加载数据失败!');
                    return;
                }
				this.options = res.data.group;
                this.tableData = res.data.row;
                this.pageTotal = pageCount(res.data.count, this.query.limit);
                this.total = res.data.count;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'page', 1);
            this.getData();
        },
        // 编辑操作
        update(row, state) {
            welfareAppleApi.update({ id: row.id, state: state, userId: row.userId }).then(({ code, msg, data }) => {
                if (200 !== code) {
                    this.$message.error(msg);
                    return;
                }
                this.$message.success('操作成功');
            });
            this.getData();
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'page', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
