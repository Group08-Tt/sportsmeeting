import request from '@/utils/request';

const WelfareInfoApi = {
    list(query) {
        return request({
            url: '/bs/bsgwyy/gameinfoSelect',
            method: 'get',
            params: query
        });
    },
	//增加
    addType(data) {
        return request({
            url: '/bs/bsgwyy/gameinfoinsert',
            method: 'post',
            data: data
        });
    },
    update(data) {
        return request({
            url: '/bs/bsgwyy/gameinfoUploud',
            method: 'post',
            data: data
        });
    },
    batchDelete(data) {
        return request({
            url: '/bs/bsgwyy/gameinfoDelete',
            method: 'post',
            data: data
        });
    }
};

export default WelfareInfoApi;
