import request from '@/utils/request';

const welfareAppleApi = {
    list(query) {
        return request({
            url: '/bs/bsgwyy/selectwxuserinfo',
            method: 'get',
            params: query
        });
    },
    update(data) {
        return request({
            url: '/admin/user/apple/update',
            method: 'post',
            data: data
        });
    },
	Exceldouloud(query){
		return request({
		    url: '/bs/bsgwyy/Exceldaochu',
		    method: 'get',
		    params: query
		});
	},
	//按照学院的划分
	Excelcollage(){
		return request({
		    url: '/bs/bsgwyy/collagename',
		    method: 'get',
		    params: []
		});
	}
};

export default welfareAppleApi;
