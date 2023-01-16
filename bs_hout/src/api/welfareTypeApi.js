import request from '@/utils/request';

const welfareTypeApi = {
    list(query) {
        return request({
            url: '/bs/bsgwyy/selectadminminknowledge',
            method: 'get',
            params: query
        });
    },
	// 新增
    addType(data) { 
        return request({
            url: '/bs/bsgwyy/insertadminminknowledge',
            method: 'post',
            data: data
        });
    },
	
    update(data) {
        return request({
            url: '/bs/bsgwyy/uploudadminminknowledge',
            method: 'post',
            data: data
        });
    },
    batchDelete(data) {
        return request({
            url: '/bs/bsgwyy/deleteadminminknowledge',
            method: 'post',
            data: data
        });
    }
};

export default welfareTypeApi;
