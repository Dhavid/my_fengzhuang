

~(function(){
    function Banner(ele,url,speed,innerSpeed){
        // 处理第一个参数
        var first=ele.substr(0,1);
        if(first==="#"){
            this.box=document.getElementById(ele.slice(1));
        }else if(first==="."){
            this.box=document.getElementsByClassName(ele.slice(1))[0];
        }
        this.wrapper=this.box.getElementsByClassName("wrapper")[0];
        this.oUl=this.box.getElementsByTagName("ul")[0];
        this.oLis=this.oUl.getElementsByTagName("li");
        this.left=this.box.getElementsByTagName("a")[0];
        this.right=this.box.getElementsByTagName("a")[1];
        this.index=0;
        this.timer=null;
        this.url=url;
        this.speed=speed;
        this.innerSpeed=innerSpeed;
        // 公有方法全放在init里面，并执行init
        this.init();
    }
    
    Banner.prototype={
        // 获取数据
        queryData:function queryData(url){
            var _that=this;
            var xhr=new XMLHttpRequest();
            xhr.open("get",this.url,false);
            xhr.onreadystatechange=function(){
                if(xhr.readyState===4&&/^2\d{2}/g.test(xhr.status)){
                    _that.data=JSON.parse(xhr.responseText);
                    _that.bindHTML(_that.data);
                }
            };
            xhr.send();
        },
        // 绑定数据
        bindHTML:function bindHTML(data){
            var divs=``;
            var lis=``;
            for(var i=0;i<data.length;i++){
                divs+=`<div><img src="${data[i].img}" alt=""></div>`;
                lis+=`<li></li>`;
            }
            divs+=`<div><img src="${data[0].img}" alt=""></div>`;
            this.wrapper.innerHTML=divs;
            this.oUl.innerHTML=lis;
        },
        // 轮播
        autoMove:function autoMove(n){
            this.index++;
            console.log(this.index);
            typeof n!=="undefined"?this.index=n:null;
            if(this.index===this.data.length+1){
                this.wrapper.style.left=0+"px";
                this.index=1;
            }
            utils.animate(this.wrapper,{left:-800*this.index},this.innerSpeed);
            this.changeTip();
        },
        // 鼠标移入移出
        mouse:function mouse(){
            var _that=this;
            this.box.onmouseover=function(){
                clearInterval(_that.timer);
            }
            this.box.onmouseout=function(){
                _that.timer=setInterval(_that.autoMove.bind(_that),_that.speed);
            }
        },
        // 对应焦点高亮显示
        changeTip:function changeTip(){
            for(var i=0;i<this.oLis.length;i++){
                if(i===this.index){
                    this.oLis[i].className="select";
                }else{
                    this.oLis[i].className="";
                }
            }
            if(this.index===this.data.length){
                this.oLis[0].className="select";
            }
        },
        // 点击焦点
        click:function click(){
            for(var i=0;i<this.oLis.length;i++){
                this.oLis[i].index=i;
                var _that=this;
                this.oLis[i].onclick=function(){
                    if(_that.index===_that.data.length){
                        _that.wrapper.style.left=0+"px";
                    }
                    utils.animate(_that.wrapper,{left:-800*this.index},300);//点击切换时的速度可以随意调整
                    _that.index=this.index;
                    _that.changeTip();
                }
            }
        },
        // 点击左右切换
        leftChange:function leftChange(){
            var _that=this;
            this.left.onclick=function(){
                _that.index--;
                if(_that.index===-1){
                    _that.wrapper.style.left=-3200+"px";
                    _that.index=_that.data.length-1;
                }
                utils.animate(_that.wrapper,{left:-800*_that.index},300);
                _that.changeTip();
            }
            this.right.onclick=function(){ //可以复用autoMove，但是点击切换时的速度不能随意调整
                _that.index++;
                if(_that.index===_that.data.length+1){
                    _that.wrapper.style.left=0+"px";
                    _that.index=1;
                }
                utils.animate(_that.wrapper,{left:-800*_that.index},300);
                _that.changeTip();
            }
        },
        init:function(){
            this.queryData(this.url);
            this.timer=setInterval(this.autoMove.bind(this),this.speed);
            this.mouse();
            this.changeTip();
            this.click();
            this.leftChange();
        }
    }
    window._Banner=window.Du=Banner;
})()