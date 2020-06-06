
// Vuex
export default {
    state: {
        token: getToken(),
        refresh_token: '',
        expires_time: '' // token保质期
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_REFRESH_TOKEN: (state, data) => { // 保存延续token
            state.refresh_token = data
        },
        SET_EXPIRES_TIME(state, data) { // 保存token过期时间
            let NOW_DATE = parseInt(new Date().getTime() / 1000)// 保存当前登陆时间
            state.expires_time = data + NOW_DATE
        }
    },
    actions: {
        loginIn({ commit, state }, userInfo) {
            commit('SET_TOKEN', userInfo.access_token)
            commit('SET_REFRESH_TOKEN', userInfo.refresh_token)// 保存延续token
            commit('SET_EXPIRES_TIME', userInfo.expires_in)// 保存token过期时间
            Cookies.set('access_token', userInfo.access_token)
        }
    }
}

