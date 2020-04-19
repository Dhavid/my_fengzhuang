
var utils = (function(){
    function linear(t,b,c,d){
        // t:运动过的时间
        // b:开始的位置（可以是宽度高度等属性）
        // c:要运动的总距离（可以是宽度高度等属性）
        // d:需要的总时间
        // 计算出此时此刻的位置
        return c/d*t+b;
    }
    function animate(curEle,target,duration,callBack){
        let begin={};
        let change={};
        for(let key in target){
            begin[key]=parseFloat(getComputedStyle(curEle)[key])
            change[key]=target[key]-begin[key]
        }
        let t=0;
        let timer = setInterval(() => {
            t+=20;
            for(let key in change){
                let cur = linear(t,begin[key],change[key],duration)
                curEle.style[key]=cur+"px";
            }
            if(t>=duration){
                clearInterval(timer);
                typeof callBack==="function"?callBack():null;
            }
        }, 20);
    }
    return {animate}
})();