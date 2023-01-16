const user = {
    state: {
        user: {}
    },
    mutations: {
        setUserInfo(state, info) {
            state.user = info
        }
    },
    actions: {
        setUserInfo({commit}, data) {
            commit('setUserInfo', data)
        }
    }
};
export default user
