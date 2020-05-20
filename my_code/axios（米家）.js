// axios在真实项目中一般会进行二次封装；
import axios from "axios";
import qs from "qs";
// 配置基础路径
// axios.defaults.baseURL="http://127.0.0.1:9999";
axios.defaults.baseURL="http://localhost:9999";
axios.defaults.timeout=10000;// 超时；
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest=option=>{
    // let str="";
    // for(let key in data){
    //     if(!Object.prototype.hasOwnProperty.call(option,key)) break;
    //     str+=`&${key}=${option[key]}`;
    // }
    // return str.substring(1);
    return qs.stringify(option); // 把前端请求的参数对象转成字符串的url,并且用&连接起来；
}
axios.interceptors.response.use(response=>{
    return response.data
})
axios.defaults.validateStatus=status=>{
    return /^(2|3)\d{2}$/.test(status); 
    // 如果返回true(或者设置为null或undefined)，继续向下执行（走response.use的resolve），返回结果，如果这返回false，不再向下执行（reject）
}

axios.defaults.withCredentials= true; //跨域访问需要发送cookie时(要求在请求头里带上cookie)

export default axios;
