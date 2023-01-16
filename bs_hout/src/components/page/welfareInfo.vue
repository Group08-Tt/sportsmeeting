<template>
	<div>
		<div class='crumbs'>
			<el-breadcrumb separator='/'>
				<el-breadcrumb-item>
					<i class='el-icon-lx-cascades'></i>比赛项目
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class='container'>
			<!--  -->
			<div class='handle-box'>
				<el-select v-model="value" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
					<el-button  type='primary' icon='el-icon-search' @click='addgame'>添加比赛</el-button>
			</div>
			<el-table :data='tableData' border class='table' ref='multipleTable' header-cell-class-name='table-header'
				@selection-change='handleSelectionChange'>
				<el-table-column type='selection' width='55' align='center'></el-table-column>
				<el-table-column prop='projectid' label='项目ID' align='center'></el-table-column>
				<el-table-column prop='projectname' label='项目名称' align='center'></el-table-column>
				<el-table-column label='状态' width='200' align='center'>
					<template slot-scope='scope'>
						<label v-if=' scope.row.start===1'>正在进行</label>
						<label v-if=' scope.row.start===2'>未开始</label>
						<label v-if=' scope.row.start===3'>已结束</label>
					</template>
				</el-table-column>

				<el-table-column label='项目类别' align='center'>
					<template slot-scope='scope'>
						<label v-if=' scope.row.projectcategory===1'>个人项目</label>
						<label v-if=' scope.row.projectcategory===2'>集体项目</label>
					</template>
				</el-table-column>

				<el-table-column label='性别' align='center'>
					<template slot-scope='scope'>
						<label v-if=' scope.row.gamegender===1'>男子</label>
						<label v-if=' scope.row.gamegender===2'>女子</label>
					</template>
				</el-table-column>

				<el-table-column prop='competition' label='赛事' align='center'></el-table-column>
				<el-table-column prop='refereesname' label='裁判' align='center'></el-table-column>
				<el-table-column prop='begintime' width='160' label='开始时间' align='center'></el-table-column>
				<el-table-column prop='endtime' width='160' label='结束时间' align='center'></el-table-column>
				<el-table-column prop='firstone' width='160' label='第一名' align='center'></el-table-column>
				<el-table-column prop='firsttwo' width='160' label='第二名' align='center'></el-table-column>
				<el-table-column prop='firstthree' width='160' label='第三名' align='center'></el-table-column>
				<el-table-column label='操作' width='235' align='center'>
					<template slot-scope='scope'>
						<el-button type='text' icon='el-icon-edit' @click='handleEdit(scope.row)'>查看详情
						</el-button>
						<el-button type='text' icon='el-icon-delete' class='red' @click='handleDelete(scope.row)'>删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class='pagination'>
				<el-pagination background layout='total, prev, pager, next' :current-page='query.page'
					:page-size='query.limit' :page-count='pageTotal' :total='total' @current-change='handlePageChange'>
				</el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title='编辑' :visible.sync='editVisible' center>
			<el-form ref='form' :model='editInfo' label-width='150px'>
				<el-form-item label='项目ID'>
					<el-input style=' max-width:350px' v-model='editInfo.projectid'></el-input>
				</el-form-item>
				<el-form-item label='项目名字'>
					<el-input style='max-width:350px' v-model='editInfo.projectname'></el-input>
				</el-form-item>
				<el-form-item label='项目类别' style='width:350px'>
					<el-select style='width:350px' v-model='editInfo.projectcategory' placeholder='请选择项目类别'
						class='handle-select mr10'>
						<el-option label='个人项目' :value='1'></el-option>
						<el-option label='集体项目' :value='2'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label='性别' style='width:350px'>
					<el-select style='width:350px' v-model='editInfo.gamegender' placeholder='请选择性别'
						class='handle-select mr10'>
						<el-option label='男子' :value='1'></el-option>
						<el-option label='女子' :value='2'></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label='赛事'>
					<el-input style='max-width:350px' v-model='editInfo.competition'></el-input>
				</el-form-item>

				<el-form-item label='裁判'>
					<el-input style='max-width:350px' v-model='editInfo.refereesname'></el-input>
				</el-form-item>
				
				<el-form-item label='比赛时间'>
					<el-date-picker v-model="valuetime" type="datetimerange" start-placeholder="开始日期"
						end-placeholder="结束日期" :default-time="['12:00:00']">
					</el-date-picker>
				</el-form-item>
				
				<el-form-item label='第一名姓名'>
					<el-input style='max-width:350px' v-model='editInfo.firstone'></el-input>
				</el-form-item>
				
				
				<el-form-item label='第二名姓名'>
					<el-input style='max-width:350px' v-model='editInfo.firsttwo'></el-input>
				</el-form-item>
				
				<el-form-item label='第三名姓名'>
					<el-input style='max-width:350px' v-model='editInfo.firstthree'></el-input>
				</el-form-item>
			</el-form>
			<span slot='footer' class='dialog-footer'>
				<el-button @click='editVisible = false'>取 消</el-button>
				<el-button type='primary' @click='saveEdit'>确 定</el-button>
			</span>
		</el-dialog>
		
		<!-- 新增的信息 -->
		<el-dialog title='新增' :visible.sync='editVisibleadd' center>
			<el-form ref='form' :model='addeditInfo' label-width='150px'>
				<el-form-item label='项目ID'>
					<el-input style=' max-width:350px' v-model='addeditInfo.projectid'></el-input>
				</el-form-item>
				<el-form-item label='项目名字'>
					<el-input style='max-width:350px' v-model='addeditInfo.projectname'></el-input>
				</el-form-item>
				<el-form-item label='项目类别' style='width:350px'>
					<el-select style='width:350px' v-model='addeditInfo.projectcategory' placeholder='请选择项目类别'
						class='handle-select mr10'>
						<el-option label='个人项目' :value='1'></el-option>
						<el-option label='集体项目' :value='2'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label='性别' style='width:350px'>
					<el-select style='width:350px' v-model='addeditInfo.gamegender' placeholder='请选择性别'
						class='handle-select mr10'>
						<el-option label='男子' :value='1'></el-option>
						<el-option label='女子' :value='2'></el-option>
					</el-select>
				</el-form-item>
		
				<el-form-item label='赛事'>
					<el-input style='max-width:350px' v-model='addeditInfo.competition'></el-input>
				</el-form-item>
		
				<el-form-item label='裁判'>
					<el-input style='max-width:350px' v-model='addeditInfo.refereesname'></el-input>
				</el-form-item>
				
				<el-form-item label='比赛时间'>
					<el-date-picker v-model="addvaluetime" type="datetimerange" start-placeholder="开始日期"
						end-placeholder="结束日期" :default-time="['12:00:00']">
					</el-date-picker>
				</el-form-item>
				
			</el-form>
			<span slot='footer' class='dialog-footer'>
				<el-button @click='editVisibleadd = false'>取 消</el-button>
				<el-button type='primary' @click='addsaveEdit'>确 定</el-button>
			</span>
		</el-dialog>
	
	</div>
</template>

<script>
	import welfareInfoApi from '@/api/welfareInfoApi';
	import {
		pageCount
	} from '@/utils/page';

	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	import {
		quillEditor
	} from 'vue-quill-editor';
	import config from '@/config';
	const {
		gettimedayretu
	} = require('../../utils/timeutil.js')

	export default {
		name: 'welfareType',
		data() {
			return {
				editVisibleadd:false,
				valuetime: [],
				addvaluetime:[],
				options: [{
					value: 0,
					label: '全部'
				}, {
					value: 1,
					label: '个人项目'
				}, {
					value: 2,
					label: '集体项目'
				}],
				value: '',
				editorOption: {
					placeholder: '编写富文本'
				},
				addeditInfo: {
					begintime:"",
					competition: "",
					endtime: "",
					firstone: "",
					firstthree: "",
					firsttwo: "",
					gamegender: 1,
					projectcategory: 1,
					projectid: "",
					projectname: "",
					refereesname: "",
				},
				editInfo: {
					begintime:"",
					competition: "",
					endtime: "",
					firstone: "",
					firstthree: "",
					firsttwo: "",
					gamegender: 1,
					projectcategory: 1,
					projectid: "",
					projectname: "",
					refereesname: "",
				},
				total: 0,
				content: null,
				query: {
					userName: '',
					titel: '',
					projectcategory: 0,
					page: 1,
					limit: 10
				},
				tableData: [],
				multipleSelection: [],
				delList: [],
				editVisible: false,
				pageTotal: 0,
				idx: -1,
				id: -1
			};
		},
		components: {
			quillEditor
		},
		watch: {
			value: function() {
				this.query.projectcategory = this.value;
				this.getData();
			},
			valuetime: function() {
				this.editInfo.begintime = new Date(this.valuetime[0]).getTime();
				this.editInfo.endtime = new Date(this.valuetime[1]).getTime()
			},
			addvaluetime:function(){
				this.addeditInfo.begintime = new Date(this.addvaluetime[0]).getTime();
				this.addeditInfo.endtime = new Date(this.addvaluetime[1]).getTime()
			}
		},
		created() {
			// let aa =  gettimedayretu(1650417600);
			// let getTime =  new Date().getTime();
			// console.log(getTime)
			this.getData();
		},
		methods: {
			/**
			 * 添加数据
			**/
			addgame(){
				this.editVisibleadd = true;
			},
			addsaveEdit(){
				welfareInfoApi.addType(this.addeditInfo).then((res) => {
					if (1 !== res.start) {
						this.$message.error('新增失败!');
						return;
					}
					this.editVisibleadd = false;
					this.$message.success('新增成功');
					this.getData();
				});
			},
			
			
			getFile(fileName) {
				return config.imgAddr + fileName;
			},
			focus(event) {
				event.enable(false); //设置富文本编辑器不可编辑
			},
			addType() {
				this.editVisible = true;
			},
			// 获取 easy-mock 的模拟数据
			getData() {
				welfareInfoApi.list(this.query).then((res) => {
					if (1 !== res.code) {
						this.$message.error('加载数据失败!');
						return;
					}
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
			// 删除操作
			handleDelete(row) {
				let projectid = row.projectid;
				// 二次确认删除
				this.$confirm('确定要删除吗？', '提示', {
					type: 'warning'
				}).then(() => {
					welfareInfoApi.batchDelete({
						projectid
					}).then((res) => {
						if (1 !== res.code) {
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
				welfareInfoApi.batchDelete({
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
				this.valuetime = []
				let infoUploud = JSON.parse(JSON.stringify(row));
				infoUploud.begintime = new Date(infoUploud.begintime).getTime();
				infoUploud.endtime = new Date(infoUploud.endtime).getTime();
				this.valuetime.push(infoUploud.begintime);
				this.valuetime.push(infoUploud.endtime);
				this.editInfo = infoUploud;
				this.editVisible = true;
			},
			// 保存编辑
			saveEdit() {
				welfareInfoApi.update(this.editInfo).then((res) => {
					if (1 !== res.start) {
						this.$message.error('修改失败!');
						return;
					}
					this.$message.success('修改成功!');
					this.getData();
					this.editVisible = false;
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
	.block {
		flex: 1;
		border: 1px solid #f0f2f5;
		text-align: center;
	}

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
