import axios from 'axios';
import {getToken} from '@/utils/auth'

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000
});

// request拦截器
service.interceptors.request.use(config => {
    config.headers['token'] = getToken()
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?'
        for (const propName of Object.keys(config.params)) {
            const value = config.params[propName]
            var part = encodeURIComponent(propName) + '='
            if (value !== null && typeof (value) !== 'undefined') {
                if (typeof value === 'object') {
                    for (const key of Object.keys(value)) {
                        let params = propName + '[' + key + ']'
                        var subPart = encodeURIComponent(params) + '='
                        url += subPart + encodeURIComponent(value[key]) + '&'
                    }
                } else {
                    url += part + encodeURIComponent(value) + '&'
                }
            }
        }
        url = url.slice(0, -1)
        config.params = {}
        config.url = url
    }
    return config
}, error => {
    Promise.reject(error)
})

service.interceptors.response.use(
    response => {
        const resultCode = response.data.code;
        if (resultCode === 1000) {
            localStorage.removeItem("AdminUserInfo");
            location.href = '/login';
        }
        return response.data;
    },
    error => {
        throw new Error(error);
    }
)

export default service;
