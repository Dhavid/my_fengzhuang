


// new Du("#outer","banner.json",2000,800);
// new Du("#outer2","banner2.json",1000,500);


// // 
// var outer=document.getElementById("outer");
// var wrapper=document.getElementsByClassName("wrapper")[0];
// var oUl=document.getElementById("list");
// var left=document.getElementById("left");
// var right=document.getElementById("right");

// // 获取数据
// var data;
// var xhr=new XMLHttpRequest();
// xhr.open("get","banner.json",false);
// xhr.onreadystatechange=function(){
//     if(xhr.readyState===4&&/^2\d{2}/g.test(xhr.status)){
//         data=JSON.parse(xhr.responseText);
//     }
// };
// xhr.send();
// console.log(data);

// // 绑定数据
// function bingHTML(){
//     var divs=``;
//     var lis=``;
//     for(var i=0;i<data.length;i++){
//         divs+=`<div><img src="${data[i].img}" alt=""></div>`;
//         lis+=`<li></li>`;
//     }
//     divs+=`<div><img src="${data[0].img}" alt=""></div>`;
//     wrapper.innerHTML=divs;
//     oUl.innerHTML=lis;
// }
// bingHTML();

// // 轮播
// var step=0;
// function autoMove(n){
//     step++;
//     console.log(step);
//     typeof n!=="undefined"?step=n:null;
//     if(step===5){
//         wrapper.style.left=0+"px";
//         step=1;
//     }
//     utils.animate(wrapper,{left:-800*step},1000);
//     changeTip();
// }
// var timer=setInterval(autoMove,2000);

// // 鼠标移入移出
// outer.onmouseover=function(){
//     clearInterval(timer);
// }
// outer.onmouseout=function(){
//     timer=setInterval(autoMove,2000);
// }

// // 对应焦点高亮显示
// var oLis=oUl.getElementsByTagName("li");
// function changeTip(){
//     for(var i=0;i<oLis.length;i++){
//         if(i===step){
//             oLis[i].className="select";
//         }else{
//             oLis[i].className="";
//         }
//     }
//     if(step===4){
//         oLis[0].className="select";
//     }
// }
// changeTip();

// // 点击焦点
// for(var i=0;i<oLis.length;i++){
//     oLis[i].index=i;
//     oLis[i].onclick=function(){
//         // clearInterval(timer);
//         if(step===4){
//             wrapper.style.left=0+"px";
//         }
//         utils.animate(wrapper,{left:-800*this.index},300);//点击切换时的速度可以随意调整
//         step=this.index;
//         changeTip();
        
//         // step=this.index-1;
//         // if(step===-1){
//         //     wrapper.style.left=0+"px";
//         //     // step=0;
//         // }
//         console.log(step);
//         // autoMove(this.index); //可以复用autoMove，但是点击切换时的速度不能随意调整

//     }
// }

// // 点击左右切换
// left.onclick=function(){
//     step--;
//     console.log(step);
//     if(step===-1){
//         wrapper.style.left=-3200+"px";
//         step=3;
//     }
//     utils.animate(wrapper,{left:-800*step},300);
//     changeTip();
// }
// right.onclick=function(){ //可以复用autoMove，但是点击切换时的速度不能随意调整
//     step++;
//     console.log(step);
//     if(step===5){
//         wrapper.style.left=0+"px";
//         step=1;
//     }
//     utils.animate(wrapper,{left:-800*step},300);
//     changeTip();
// }
