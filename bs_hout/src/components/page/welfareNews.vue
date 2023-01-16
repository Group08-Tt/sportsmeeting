<template>
    <div>
        <div class='crumbs'>
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item>
                    <i class='el-icon-lx-cascades'></i> 公益新闻
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='container'>
            <div class='handle-box'>
                <el-button
                    type='primary'
                    icon='el-icon-circle-plus-outline'
                    class='handle-del mr10'
                    @click='addType'
                >添加新闻
                </el-button>
                <el-button
                    type='primary'
                    icon='el-icon-delete'
                    class='handle-del mr10'
                    @click='delAllSelection'
                >批量删除
                </el-button>
                <el-input v-model='query.name' placeholder='名称' class='handle-input mr10'></el-input>
                <el-button type='primary' icon='el-icon-search' @click='handleSearch'>搜索</el-button>
            </div>
            <el-table
                :data='tableData'
                border
                class='table'
                ref='multipleTable'
                header-cell-class-name='table-header'
                @selection-change='handleSelectionChange'
            >
                <el-table-column type='selection' width='55' align='center'></el-table-column>
                <el-table-column prop='id' label='ID' width='55' align='center'></el-table-column>
                <el-table-column prop='titel' label='标题'></el-table-column>
                <el-table-column prop='author' label='作者'></el-table-column>
                <el-table-column label='内容'>
                    <template slot-scope='scope'>
                        <label class='content'>{{ scope.row.content }}</label>
                    </template>
                </el-table-column>
                <el-table-column prop='createTime' label='添加时间'></el-table-column>
                <el-table-column label='操作' width='180' align='center'>
                    <template slot-scope='scope'>
                        <el-button
                            type='text'
                            icon='el-icon-edit'
                            @click='handleEdit(scope.$index, scope.row)'
                        >编辑
                        </el-button>
                        <el-button
                            type='text'
                            icon='el-icon-delete'
                            class='red'
                            @click='handleDelete(scope.$index, scope.row)'
                        >删除
                        </el-button>
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

        <!-- 编辑弹出框 -->
        <el-dialog title='编辑' :visible.sync='editVisible' width='30%'>
            <el-form :rules='rules' ref='form' :model='form' label-width='80px'>
                <el-form-item label='标题' prop='titel'>
                    <el-input maxlength='14' v-model='form.titel'></el-input>
                </el-form-item>
                <el-form-item label='作者' prop='author'>
                    <el-input v-model='form.author'></el-input>
                </el-form-item>
                <el-form-item label='内容' prop='content'>
                    <el-input
                        type='textarea'
                        :autosize='{ minRows: 2, maxRows: 5}'
                        placeholder='请输入内容'
                        v-model='form.content'
                    >
                    </el-input>
                </el-form-item>
            </el-form>

            <span slot='footer' class='dialog-footer'>
                <el-button @click='editVisible = false'>取 消</el-button>
                <el-button type='primary' @click='saveEdit'>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import welfareNewsApi from '@/api/welfareNewsApi';
import { pageCount } from '@/utils/page';

export default {
    name: 'welfareType',
    data() {
        return {
            query: {
                name: '',
                page: 1,
                limit: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            total: 0,
            form: {
                id: 0
            },
            idx: -1,
            id: -1,
            rules: {
                titel: [{ required: true, trigger: 'blur', message: '必填项不能为空' }],
                author: [{ required: true, trigger: 'blur', message: '必填项不能为空' }],
                content: [{ required: true, trigger: 'blur', message: '必填项不能为空' }]
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        addType() {
            this.editVisible = true;
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            welfareNewsApi.list(this.query).then(({ code, msg, data }) => {
                if (200 !== code) {
                    this.$message.error('加载数据失败!');
                    return;
                }
                this.tableData = data.result.rows;
                this.pageTotal = pageCount(data.result.count, this.query.limit);
                this.total = data.result.count;
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
                welfareNewsApi.batchDelete({ ids: [row.id] }).then(({ code }) => {
                    if (200 !== code) {
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
            welfareNewsApi.batchDelete({ ids: arr }).then(({ code }) => {
                if (200 !== code) {
                    this.$message.error('删除失败!');
                    return;
                }
                this.$message.success('删除成功!');
                this.getData();
            });
        },
        // 编辑操作
        handleEdit(index, row) {
            this.form = JSON.parse(JSON.stringify(row));
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {

            this.$refs['form'].validate((valid) => {
                if (!valid) {
                    return false;
                }

                if (this.form.id === 0 || this.form.id === undefined) {
                    welfareNewsApi.addType(this.form).then(({ code, msg, data }) => {
                        if (200 !== code) {
                            this.$message.error('添加失败!');
                            return;
                        }
                        this.form = {};
                        this.$message.success('添加成功!');
                        this.getData();
                        this.editVisible = false;
                    });
                } else {
                    welfareNewsApi.update(this.form).then(({ code, msg, data }) => {
                        if (200 !== code) {
                            this.$message.error('修改失败!');
                            return;
                        }
                        this.form = {};
                        this.$message.success('修改成功!');
                        this.getData();
                        this.editVisible = false;
                    });
                }

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

.content {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
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
