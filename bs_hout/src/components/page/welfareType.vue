<template>
	<div>
		<div class='crumbs'>
			<el-breadcrumb separator='/'>
				<el-breadcrumb-item>
					<i class='el-icon-lx-cascades'></i> 体育常识
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class='container'>
			<div class='handle-box'>
				<el-button type='primary' icon='el-icon-circle-plus-outline' class='handle-del mr10' @click='addType'>
					添加类别
				</el-button>
				<!--                <el-button
                    type='primary'
                    icon='el-icon-delete'
                    class='handle-del mr10'
                    @click='delAllSelection'
                >批量删除
                </el-button>
                <el-input v-model='query.name' placeholder='名称' class='handle-input mr10'></el-input>
                <el-button type='primary' icon='el-icon-search' @click='handleSearch'>搜索</el-button> -->
			</div>
			<el-table :data='tableData' border class='table' ref='multipleTable' header-cell-class-name='table-header'
				@selection-change='handleSelectionChange'>
				<el-table-column type='selection' width='55' align='center'></el-table-column>
				<el-table-column prop='id' label='ID' width='55' align='center'></el-table-column>
				<el-table-column prop='title' label='类别名称' align='center'></el-table-column>
				<el-table-column prop='body' label='内容' align='center'></el-table-column>
				<el-table-column label='banner' align='center'>
					<template slot-scope='scope'>
						<img style='width: 150px;' :src='  httpurl+scope.row.imagesrc'>
					</template>
				</el-table-column>
				<el-table-column prop='time' label='添加时间' align='center'></el-table-column>
				<el-table-column label='操作' width='180' align='center'>
					<template slot-scope='scope'>
						<el-button type='text' icon='el-icon-edit' @click='handleEdit(scope.row)'>编辑
						</el-button>
						<el-button type='text' icon='el-icon-delete' class='red'
							@click='handleDelete(scope.$index, scope.row)'>删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class='pagination'>
				<el-pagination background layout='total, prev, pager, next' :current-page='query.page'
					:page-size='query.limit' :total='total' :page-count='pageTotal' @current-change='handlePageChange'>
				</el-pagination>
			</div>
		</div>


		<!-- 添加弹出框 -->
		<el-dialog title='添加' :visible.sync='editVisible' width='30%'>
			<el-form ref='form' :model='form' label-width='80px'>
				<el-form-item label='项目名称'>
					<el-input v-model='form.title'></el-input>
				</el-form-item>
				<el-form-item label='banner'>
					<el-input v-model='form.imagesrc'></el-input>
				</el-form-item>

				<el-form-item label='内容'>
					<el-input v-model='form.body'></el-input>
				</el-form-item>

			</el-form>
			<span slot='footer' class='dialog-footer'>
				<el-button @click='editVisible = false'>取 消</el-button>
				<el-button type='primary' @click='saveEdit'>确 定</el-button>
			</span>
		</el-dialog>

		<!-- 编辑弹出框 -->
		<el-dialog title='编辑' :visible.sync='editVisiblebianji' width='30%'>
			<el-form ref='form' :model='formbianji' label-width='80px'>
				<el-form-item label='项目名称'>
					<el-input v-model='formbianji.title'></el-input>
				</el-form-item>
				<el-form-item label='banner'>
					<el-input v-model='formbianji.imagesrc'></el-input>
				</el-form-item>

				<el-form-item label='内容'>
					<el-input v-model='formbianji.body'></el-input>
				</el-form-item>

			</el-form>
			<span slot='footer' class='dialog-footer'>
				<el-button @click='editVisiblebianji = false'>取 消</el-button>
				<el-button type='primary' @click='saveEditbianji'>确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	import welfareTypeApi from '@/api/welfareTypeApi';
	import {
		pageCount
	} from '@/utils/page';
	import {gettimedayretu} from '@/utils/timeutil.js'
	import httpconfig from '@/config.js'
	export default {
		name: 'welfareType',
		data() {
			return {
				imagesrc:"",
				query: {
					name: '',
					page: 1,
					limit: 20
				},
				tableData: [],
				multipleSelection: [],
				delList: [],
				editVisible: false,
				editVisiblebianji: false,
				pageTotal: 0,
				total: 0,
				form: {
					title: "体育小常识",
					imagesrc: "/aver/avver.png",
					body: "我是body",
					creattime: ""
				},
				formbianji: {
					title: "",
					imagesrc: "",
					body: "",
					creattime: ""
				},
				idx: -1,
				id: -1,
			};
		},
		created() {
			this.getData();
			this.httpurl =  httpconfig.httpconfig
		},
		methods: {
			// 编辑数据上报
			saveEditbianji() { //更新
				this.editVisiblebianji = false;
				welfareTypeApi.update(this.formbianji).then((res) => {
					console.log(res)
					if (1 !== res.start) {
						this.$message.error('更新失败!');
						return;
					}
					this.$message.success('更新成功!');
					this.getData();
				})
			},

			addType() {
				this.editVisible = true;
			},
			// 获取 easy-mock 的模拟数据
			getData() {
				welfareTypeApi.list(this.query).then(({
					code,
					msg,
					data
				}) => {
					if (1 !== code) {
						this.$message.error('加载数据失败!');
						return;
					}
					let rowlist = data.row;
					rowlist.forEach((item,index)=>{
						// item.imagesrc = httpconfig.httpconfig + item.imagesrc
						item.time = gettimedayretu(item.time*1).all_time
					})
					console.log(rowlist)
					this.tableData = rowlist;
					this.pageTotal = pageCount(data.count, this.query.limit);
					this.total = data.count;
				});
			},
			// 触发搜索按钮
			handleSearch() {
				this.$set(this.query, 'page', 1);
				this.getData();
			},
			// 删除操作
			handleDelete(index, row) {
				// 二次确认删除
				this.$confirm('确定要删除吗？', '提示', {
					type: 'warning'
				}).then(() => {
					welfareTypeApi.batchDelete({
						id: row.id
					}).then(({
						code
					}) => {
						if (1 !== code) {
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
				let arr = [];
				this.multipleSelection.forEach(item => {
					arr.push(item.id);
				});
				welfareTypeApi.batchDelete({
					ids: arr
				}).then(({
					code
				}) => {
					if (200 !== code) {
						this.$message.error('删除失败!');
						return;
					}
					this.$message.success('删除成功!');
					this.getData();
				});
			},
			// 编辑操作
			handleEdit(row) {
				this.formbianji = JSON.parse(JSON.stringify(row));
				console.log("对应的数据是",this.formbianji,this.tableData)
				this.editVisiblebianji = true;
			},
			// 保存编辑
			saveEdit() {
				//说明是新增
				this.editVisible = false;
				this.form.creattime = new Date().getTime();
				welfareTypeApi.addType(this.form).then((res) => {
					console.log(res)
					if (1 !== res.start) {
						this.$message.error('添加失败!');
						return;
					}
					this.$message.success('添加成功!');
					this.getData();
				})
				// this.$refs['form'].validate((valid) => {
				// 	if (!valid) {
				// 		return false;
				// 	}

				// 	if (this.form.id === 0 || this.form.id === undefined) {
				// 		welfareTypeApi.addType(this.form).then(({
				// 			code,
				// 			msg,
				// 			data
				// 		}) => {
				// 			if (200 !== code) {
				// 				this.$message.error('添加失败!');
				// 				return;
				// 			}
				// 			this.form = {};
				// 			this.$message.success('添加成功!');
				// 			this.getData();
				// 			this.editVisible = false;
				// 		});
				// 	} else {
				// 		welfareTypeApi.update(this.form).then(({
				// 			code,
				// 			msg,
				// 			data
				// 		}) => {
				// 			if (200 !== code) {
				// 				this.$message.error('修改失败!');
				// 				return;
				// 			}
				// 			this.form = {};
				// 			this.$message.success('修改成功!');
				// 			this.getData();
				// 			this.editVisible = false;
				// 		});
				// 	}
				// });


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
