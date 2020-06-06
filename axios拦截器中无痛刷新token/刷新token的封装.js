

const axios = require("axios");
// 封装请求
function request(url, options) {
    const token = localStorage.getItem('token');
    const defaultOptions = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        url: url,
        baseURL: BASE_URL,
    };
    const newOptions = { ...options, ...defaultOptions };
    return axios.request(newOptions)
        .then(checkStatus)
        .catch(error => console.log(error));
}


// 默认纸条（isRefreshing 为true表示此时没有正在刷新）
let isRefreshing = true;
function checkStatus(response) {
    if (response && response.code === 1002) {
        // 刷新token的函数,这需要添加一个开关，防止重复请求
        if (isRefreshing) {
            refreshTokenRequst()
        }
        isRefreshing = false;
        // 将当前的请求保存在观察者数组中
        const retryOriginalRequest = new Promise((resolve) => {
            addSubscriber(() => {
                resolve(request(url, options))
            })
        });
        return retryOriginalRequest;
    } else {
        return response;
    }
}


function refreshTokenRequst() {
    let data;
    const refreshToken = localStorage.getItem('refreshToken');
    data = {
        authorization: 'YXBwYXBpczpaSWxhQUVJdsferTeweERmR1praHk=',
        refreshToken,
    }
    axios.request({
        baseURL: BASE_URL,
        url: '/app/renewal',
        method: 'POST',
        data,
    }).then((response) => {
        // 刷新完成后,将刷新token和refreshToken存储到本地
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('token', response.data.token);
        // 并且将所有存储到观察者数组中的请求重新执行。
        onAccessTokenFetched();
        // 纸条撕掉
        isRefreshing = true;
    });
}


// 观察者
let subscribers = [];
function onAccessTokenFetched() {
    subscribers.forEach((callback) => {
        callback();
    })
    subscribers = [];
}

function addSubscriber(callback) {
    subscribers.push(callback)
}
// 纸条相当于变量isRefreshing，观察者相当于数组subscribers。以上便是token失效时的处理策略