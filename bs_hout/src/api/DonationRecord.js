import request from '@/utils/request';

const donationRecordApi = {
    list(query) {
        return request({
            url: '/admin/sys/DonationRecord/query',
            method: 'get',
            params: query
        });
    },
    update(data) {
        return request({
            url: '/admin/sys/DonationRecord/update',
            method: 'post',
            data: data
        });
    },
    batchDelete(data) {
        return request({
            url: '/admin/sys/DonationRecord/batchDelete',
            method: 'post',
            data: data
        });
    }
};

export default donationRecordApi;
