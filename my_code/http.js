import axios from "axios";

// function http() {
//     return axios.create({
//         baseURL: "",
//         transformRequest(option) {
//             let str = "";
//             for (var key in option) {
//                 // if (!option.hasOwnPrototype(key)) break;
//                 if(Object.prototype.hasOwnProperty.call(option, key)) break; //ESLint不会报错
//                 str += "&" + key + "=" + option[key];
//             }
//             return str.substring(1);
//         },
//         // 给每一个请求拼接t，t的值是随机数，防止走缓存
//         params: {
//             t: Math.random()
//         },
//         timeout: 2000
//     })
// }

// 根据环境变量区分接口的默认地址
switch (process.env.NODE_ENV) {
    case "production": //生产环境
        axios.default.baseURL="http://api.zhufengpeixun.cn";
        break;
    case "test": //测试环境
        axios.default.baseURL="http://192.168.20.12:8000";
        break;
    default: //默认的开发环境
        axios.default.baseURL="http://127.0.0.1:3000";
}

let http=axios.create({
    baseURL: "",
    transformRequest(option) {
        let str = ``;
        for (var key in option) {
            // if (!option.hasOwnProperty(key)) break;
            if(!Object.prototype.hasOwnProperty.call(option, key)) break; //ESLint不会报错
            str += "&" + key + "=" + option[key];
        }
        return str.substring(1);
    },
    // 给每一个请求拼接t，t的值是随机数，防止走缓存
    params: {
        t: Math.random()
    },
    timeout: 2000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在请求之前可以做做一些事情，比如携带上token
    let token=localStorage.getItem("token");
    token && (config.headers.Authorization=token);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 
// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // response 就是请求回来的响应体
    return response.data;// 那么请求后面then就可以直接接受到响应的数据
}, function (error) {
    // 对响应错误做点什么
    let {response}=error;
    if(response){
        // 说明服务器最起码返回结果了
        switch(response.status){
            case 401://权限
                break;
            case 403://服务器拒绝执行（一般是token过期）
                break;
            case 404://找不到页面资源
                break;
        }
    }else{
        // 服务器连结果都没有返回
        if(!window.navigator.onLine){
            // 断网处理：可以跳转到断网页面
            return;
        }
        return Promise.reject(error);
    }
    
});

export default http





// transformRequest(data){
//     let str=``;
//     for(var key in data){
//         str+=`&${key}=${data[key]}`;
//     }
//     return str.substring(1);
// }


