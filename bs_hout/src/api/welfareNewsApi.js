import request from '@/utils/request';

const welfareTypeApi = {
    list(query) {
        return request({
            url: '/admin/sys/news/query',
            method: 'get',
            params: query
        });
    },
    addType(data) {
        return request({
            url: '/admin/sys/news/save',
            method: 'post',
            data: data
        });
    },
    update(data) {
        return request({
            url: '/admin/sys/news/update',
            method: 'post',
            data: data
        });
    },
    batchDelete(data) {
        return request({
            url: '/admin/sys/news/batchDelete',
            method: 'post',
            data: data
        });
    }
};

export default welfareTypeApi;
