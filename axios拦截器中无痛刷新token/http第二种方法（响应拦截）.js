
// 是否正在刷新的标记 -- 防止重复发出刷新token接口--节流阀
let isRefreshing = false
// 失效后同时发送请求的容器 -- 缓存接口
let subscribers = []
// 刷新 token 后, 将缓存的接口重新请求一次
function onAccessTokenFetched(newToken) {
    subscribers.forEach((callback) => {
        callback(newToken)
    })
    // 清空缓存接口
    subscribers = []
}
// 添加缓存接口
function addSubscriber(callback) {
    subscribers.push(callback)
}

service.interceptors.request.use(
    config => {
        config.headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + cloudConfig.Authorization,
            'Content-Type': 'application/json; charset=UTF-8'
        }
        if (store.getters.token) {
            config.headers['Authorization'] = 'Bearer ' + getToken()
        }
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        if ((isTokenExpired() || response.responseStatus === 401) && !response.config.url.includes('/oauth/token')) { // 如果token快过期了
            if (!isRefreshing) { // 控制重复获取token
                isRefreshing = true
                let formData = new FormData()
                formData.append('grant_type', 'refresh_token')
                formData.append('refresh_token', store.state.user.refresh_token)
                axios({
                    url: '/identity/oauth/token',
                    method: 'post',
                    data: formData,
                    baseURL: cloudConfig.api_path,
                    timeout: cloudConfig.api_timeout,
                    headers: {
                        'Authorization': 'Basic ' + cloudConfig.Authorization
                    }
                }).then(res => {
                    isRefreshing = false
                    // console.log(res)
                    if (res.status === 200) {
                        store.dispatch('loginIn', res.data)
                        onAccessTokenFetched(res.data.access_token)
                    }
                }).catch(() => {
                    router.push({ path: '/login' })// 失败就跳转登陆
                    isRefreshing = false
                })
            }

            // 将其他接口缓存起来 
            const retryRequest = new Promise((resolve) => {
                // 返回Promise并且让其状态一直为等待状态,
                // 只有当token刷新成功后, 就会调用通过addSubscriber函数添加的缓存接口,
                // 此时, Promise的状态就会变成resolve
                addSubscriber((newToken) => {
                    // 表示用新的token去替换掉原来的token
                    response.config.headers.Authorization = 'Bearer ' + newToken
                    // 替换掉url -- 因为baseURL会扩展请求url
                    response.config.url = response.config.url.replace(response.config.baseURL, '')
                    // 用重新封装的config去请求, 就会将重新请求后的返回
                    resolve(service(response.config))
                })
            })
            return retryRequest
        }
        // -------忽略以下代码
    }
)



