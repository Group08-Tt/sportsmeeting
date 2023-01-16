import request from '@/utils/request';

const welfareTypeApi = {
    list(query) {
        return request({
            url: '/admin/sys/rule/query',
            method: 'get',
            params: query
        });
    },
    addType(data) {
        return request({
            url: '/admin/sys/rule/save',
            method: 'post',
            data: data
        });
    },
    update(data) {
        return request({
            url: '/admin/sys/rule/update',
            method: 'post',
            data: data
        });
    },
    batchDelete(data) {
        return request({
            url: '/admin/sys/rule/batchDelete',
            method: 'post',
            data: data
        });
    }
};

export default welfareTypeApi;
