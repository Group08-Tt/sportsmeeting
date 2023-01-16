<template>
    <div>
        <div class='crumbs'>
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item>
                    <i class='el-icon-lx-cascades'></i>捐赠列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='container'>
            <div class='handle-box'>
                <!--                <el-button-->
                <!--                    type='primary'-->
                <!--                    icon='el-icon-delete'-->
                <!--                    class='handle-del mr10'-->
                <!--                    @click='delAllSelection'-->
                <!--                >批量删除-->
                <!--                </el-button>-->
                <el-input v-model='query.userName' placeholder='账户' class='handle-input mr10'></el-input>
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
                <el-table-column label='账户'>
                    <template slot-scope='scope'>
                        {{ scope.row.userInfo.userName }}
                    </template>
                </el-table-column>
                <el-table-column label='捐赠项目'>
                    <template slot-scope='scope'>
                        {{ scope.row.projectInfo.titel }}
                    </template>
                </el-table-column>
                <el-table-column label='捐赠金额'>
                    <template slot-scope='scope'>
                        <span v-if='scope.row.projectType===2'>-</span>
                        <span v-else>{{scope.row.amt}}</span>
                    </template>
                </el-table-column>
                <el-table-column label='捐赠类型'>
                    <template slot-scope='scope'>
                        <span v-if='scope.row.projectType===2'>物资捐助</span>
                        <span v-else>金额捐助</span>
                    </template>
                </el-table-column>
                <el-table-column prop='material' label='捐助物资内容'></el-table-column>
                <el-table-column prop='createTime' label='捐赠时间'></el-table-column>
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
import { pageCount } from '@/utils/page';
import donationRecordApi from '@/api/DonationRecord';

export default {
    name: 'welfareType',
    data() {
        return {
            query: {
                userName: '',
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
                id: 0,
                welfarName: null
            },
            idx: -1,
            id: -1,
            rules: {
                welfarName: [{ required: true, trigger: 'blur', message: '必填项不能为空' }]
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
            donationRecordApi.list(this.query).then(({ code, msg, data }) => {
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
        handleDelete(row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                donationRecordApi.batchDelete({ ids: [row.id] }).then(({ code }) => {
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
            donationRecordApi.batchDelete({ ids: arr }).then(({ code }) => {
                if (200 !== code) {
                    this.$message.error('删除失败!');
                    return;
                }
                this.$message.success('删除成功!');
                this.getData();
            });
        },
        // 编辑操作
        handleEdit(row, state) {
            let param = {
                id: row.id,
                state: state
            };
            donationRecordApi.update(param).then(({ code }) => {
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
