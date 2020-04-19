import React,{useEffect}from "react";
import Swiper from "swiper";
import "swiper/css/swiper.css";
import "./swiper.less";
function Banner(props){
        // console.log(props);
        let data=props.data||[];
        useEffect(()=>{
            // 当DOM加载完毕执行；
            // if(data.length===0)return;
            new Swiper(".swiper-container",{
                observer:true,  //修改swiper自己或子元素时，自动初始化swiper    
                observeParents:true,  //修改swiper的父元素时，自动初始化swiper
                loop: true,
                speed:1000,
                pagination: {
                    el: '.swiper-pagination',
                },
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false, //如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）
                    disableOnInteraction: true, //如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
                },
            });
        })
        return <div className="swiper-container">
            <div className="swiper-wrapper">
                {data.map((item,index)=>{
                    return <div className="swiper-slide" key={index}>
                        <img src={item.url}></img>
                    </div>
                })}
            </div>
            <div className="swiper-pagination"></div>
        </div>
    }
export default Banner;