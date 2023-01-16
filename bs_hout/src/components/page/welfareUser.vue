<template>
	<div>
		<div class='crumbs'>
			<el-breadcrumb separator='/'>
				<el-breadcrumb-item>
					<i class='el-icon-lx-cascades'></i>运动员列表
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
				
				
				<el-button type='primary' icon='el-icon-delete' class='handle-del mr10' @click='delAllSelection'>批量删除
				</el-button>
				<!-- <el-input v-model='query.userName' placeholder='账户' class='handle-input mr10'></el-input> -->
				<el-button type='primary' icon='el-icon-search' @click='batchaddbutton'>批量导入</el-button>
				
			</div>
			<el-table :data='tableData' border class='table' ref='multipleTable' header-cell-class-name='table-header'
				@selection-change='handleSelectionChange'>
				<el-table-column type='selection' width='55' align='center'></el-table-column>
				<el-table-column prop='athletesid' label='运动员ID' align='center'></el-table-column>
				<el-table-column prop='studentid' label='学生证' align='center'></el-table-column>
				<el-table-column prop='nickname' label='姓名'  align='center'></el-table-column>
				<el-table-column prop='collegename' label='学院'  align='center'></el-table-column>
				<el-table-column prop='projectname' label='比赛项目'  align='center'></el-table-column>
				<el-table-column prop='state' label='性别'  align='center'>
					<template slot-scope='scope'>
						<span v-if='scope.row.gender===0'>未知</span>
						<span v-if='scope.row.gender===1'>男</span>
						<span v-if='scope.row.gender===2'>女</span>
					</template>
				</el-table-column>
				<!--                <el-table-column label='是否可提交项目'>
                    <template slot-scope='scope'>
                        <span v-if='scope.row.donorStatus===0'>不可提交</span>
                        <span v-if='scope.row.donorStatus===1'>可提交</span>
                    </template>
                </el-table-column> -->
				<el-table-column label='操作' width='180' align='center'>
					<template slot-scope='scope'>
						<el-button type='text' icon='el-icon-edit' @click='audited(scope.row)'>编辑
						</el-button>
						<el-button type='text' icon='el-icon-delete' class='red' @click='handleDelete(scope.row)'>删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class='pagination'>
				<el-pagination background layout='total, prev, pager, next' :current-page='query.page'
					:page-size='query.limit' :total='total' :page-count='pageTotal' @current-change='handlePageChange'>
				</el-pagination>
			</div>


			<el-dialog title='Excel批量导入' :visible.sync='pushadd' width='40%'>
				<el-upload class="upload-demo" drag :action="UploudFilesrc" :on-success="UploudSuccess">
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip">只能上传Excel文件</div>
				</el-upload>
			</el-dialog>


			<!-- 编辑弹出框 -->
			<el-dialog title='编辑' :visible.sync='editVisible' width='30%'>
				<el-form :rules='rules' ref='form' :model='Eduildtable' label-width='100px'>
					<el-form-item label='运动员编号'>
						<el-input v-model='Eduildtable.athletesid'></el-input>
					</el-form-item>
					<el-form-item label='项目编号'>
						<el-input v-model='Eduildtable.projectid'></el-input>
					</el-form-item>

					<el-form-item label='项目名字'>
						<el-input v-model='Eduildtable.projectname'></el-input>
					</el-form-item>

					<el-form-item label='学院编号'>
						<el-input v-model='Eduildtable.collegeid'></el-input>
					</el-form-item>

					<el-form-item label='学院名称'>
						<el-input v-model='Eduildtable.collegename'></el-input>
					</el-form-item>

					<el-form-item label='学生学号'>
						<el-input v-model='Eduildtable.studentid'></el-input>
					</el-form-item>

					<el-form-item label='学生学号'>
						<el-input v-model='Eduildtable.nickname'></el-input>
					</el-form-item>

					<el-form-item label='性别'>
						<el-input v-model='Eduildtable.gender'></el-input>
					</el-form-item>

				</el-form>
				<span slot='footer' class='dialog-footer'>
					<el-button @click='editVisible = false'>取 消</el-button>
					<el-button type='primary' @click="saveEdit">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import welfareUserApi from '@/api/welfareUserApi';
	import {
		pageCount
	} from '@/utils/page';
	// import {httpconfig} from '@/utils/httpconfig.js';
	import config from '@/utils/httpconfig.js'
	// const {config} = require("@/src/config.js")

	export default {
		name: 'welfareType',
		data() {
			return {
				collagesuperr:"",
				options:[],
				signsuperr:"",
				value:3,
			optionssign: [{
				value: 3,
				label: '全部'
			},{
				value: 1,
				label: '男'
			}, {
				value: 2,
				label: '女'
			}],
			value: '',
				UploudFilesrc: "", //上传文件的路径的位置
				Eduildtable: {},
				query: {
					userName: '',
					page: 1,
					limit: 20,
					gender:3, //是男是女
					college:0,
				},
				tableData: [],
				pushadd: false,
				multipleSelection: [],
				delList: [],
				editVisible: false,
				pageTotal: 0,
				total: 0,
				form: {
					id: 0,
					welfarName: null
				},
				idx: -1,
				id: -1,
				rules: {
					welfarName: [{
						required: true,
						trigger: 'blur',
						message: '必填项不能为空'
					}]
				}
			};
		},
		created() {
			this.UploudFilesrc = config.httpExcel;
			this.navdatadatareq();
			this.getData();
		},
		watch:{
			signsuperr:function(){
				this.query.gender = this.signsuperr;
				this.getData();
			},
			collagesuperr:function(){
				this.query.college = this.collagesuperr;
				this.getData();
			}
		},
		methods: {
			//导航栏的信息获取
			navdatadatareq(){
				welfareUserApi.navdata().then((res) => {
					this.options = res;
				});
			},
			
			//批量更新上传文件
			UploudSuccess() {
				this.pushadd = false;
				setTimeout(() => {
					this.getData();
					this.$message.success('批量上传成功');
				}, 1000)
			},

			// 批量导入按钮
			batchaddbutton() {
				this.pushadd = true;
			},
			/**
			 * 点击的编辑
			 **/
			saveEdit() {
				this.editVisible = false;
				this.Eduildtable.gender = this.Eduildtable.gender == '男' ? 1 : 2;
				welfareUserApi.update(this.Eduildtable).then((res) => {
					if (res.start != 1) {
						this.$message.error('更新数据失败!');
						return;
					}
					this.getData();
				})
			},

			addType() {
				this.editVisible = true;
			},
			// 获取 easy-mock 的模拟数据
			getData() {
				this.tableData = [];
				welfareUserApi.list(this.query).then((res) => {
					if (1 !== res.code) {
						res.code !== 0 ? this.$message.error(res.msg) : "";
						return;
					}
					this.tableData = res.data.row
					console.log(this.tableData)
					this.pageTotal = pageCount(res.data.count, this.query.limit);
					this.total = res.data.count;
				});
			},
			// 触发搜索按钮
			handleSearch() {
				this.$set(this.query, 'page', 1);
				this.getData();
			},
			// 删除操作
			handleDelete(row) {
				let athletesid = row.athletesid;
				// 二次确认删除
				this.$confirm('确定要删除吗？', '提示', {
					type: 'warning'
				}).then(() => {
					welfareUserApi.batchDelete({
						athletesid
					}).then((res) => {
						if (1 !== res.start) {
							this.$message.error('删除失败!');
							return;
						}
						this.$message.success('删除成功');
						this.getData();
					});
				});
			},
			// 多选操作
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			delAllSelection() {
				const length = this.multipleSelection.length;
				if (0 === length) {
					this.$message.error('请选择需要删除的数据');
					return;
				}
				this.multipleSelection.forEach(item => {
					welfareUserApi.batchDelete({
						athletesid: item.athletesid
					}).then((res) => {
						if (1 !== res.start) {
							this.$message.error('删除失败!');
							return;
						}
						this.$message.success('删除成功');
						this.getData();
					});
				});
			},
			audited(row) {
				this.Eduildtable = JSON.parse(JSON.stringify(row));
				this.Eduildtable.gender = this.Eduildtable.gender == 1 ? "男" : "女"
				this.editVisible = true;
				// let param = {
				//     id: row.id,
				//     donorStatus: 1
				// };
				// welfareUserApi.update(param).then(({ code }) => {
				//     if (200 !== code) {
				//         this.$message.error('操作失败!');
				//         return;
				//     }
				//     this.$message.success('操作成功!');
				//     this.getData();
				// });
			},
			// 编辑操作
			handleEdit(row, state) {
				let param = {
					id: row.id,
					state: state
				};
				welfareUserApi.update(param).then(({
					code
				}) => {
					if (200 !== code) {
						this.$message.error('操作失败!');
						return;
					}
					this.$message.success('操作成功!');
					this.getData();
				});

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
