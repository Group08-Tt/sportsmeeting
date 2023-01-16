import request from '@/utils/request';

const welfareUserApi = {
    list(query) {
        return request({
            url: '/bs/bsgwyy/selectathletes',
            method: 'get',
            params: query
        });
    },
	navdata(query) {
	    return request({
	        url: '/bs/bsgwyy/colleagegroupfun',
	        method: 'get',
	    });
	},
    update(data) { 
        return request({
            url: '/bs/bsgwyy/uploudathletes',
            method: 'post',
            data: data
        });
    },
    batchDelete(data) {
        return request({
            url: '/bs/bsgwyy/deleteathletes',
            method: 'post',
            data: data
        });
    },
	// ExcelFileadd(){
	// 	return request({
	// 	    url: '/bs/bsgwyy/ExcelReadFile',
	// 	    method: 'post',
	// 	    data: data
	// 	});
	// }
};

export default welfareUserApi;
