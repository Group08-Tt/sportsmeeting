import service from '@/utils/request';


const UserApi = {
    // 登录方法
    login(info) {
        return service({
            url: '/bs/bsgwyy/login',
            method: 'post',
            data: info
        });
    }
};

export default UserApi;
