<template>
<div id="Index_id" class="Index_Main Index_Container_CN">
    <div class="Banner_Top_Container">
        <div id="scene" data-aos="zoom-in-up" data-aos-duration="500">
            <div class="layer_bottom" data-depth="-0.2">
                <img class="bg" src="../assets/home/topbg.png">
            </div>
            <div class="layer_3" data-depth="0.3">
                <img src="../assets/home/topbtn_08.png">
                <img src="../assets/home/topbtn_09.png">
            </div>
            <div class="layer_2" data-depth="0.6">
                <img src="../assets/home/topbtn_05.png">
                <img src="../assets/home/topbtn_06.png">
                <img src="../assets/home/topbtn_07.png">
            </div>
            <div class="layer_1" data-depth="0.9">
                <img src="../assets/home/top_01.png">
                <img src="../assets/home/topbtn_02.png">
                <img src="../assets/home/topbtn_03.png">
                <img src="../assets/home/topbtn_01.png">
            </div>
        </div>
        <div class="title_container">
            <div class="inner_container">
                <span class="title">{{$i18n.t('index.title')}}</span>
                <span class="title2"><span>{{$i18n.t('index.introduce_1')}}</span><span>{{$i18n.t('index.introduce_2')}}</span></span>
                <div class="item">
                    <div>
                       <img src="../assets/home/item_01.png"><br>
                       <span>{{$i18n.t('index.Mahjong')}}</span>
                    </div>
                    <div>
                        <img src="../assets/home/item_02.png"><br>
                        <span>{{$i18n.t('index.Card_Games')}}</span>
                    </div>
                    <div>
                        <img src="../assets/home/item_03.png"><br>
                        <span>{{$i18n.t('index.Slot_Games')}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="scroll_effect">
            <span>Scroll <i class="el-icon-arrow-down" ></i></span>
            <br>
            <span></span>
        </div>
    </div>
    <div class="lastest_Info">
        <center>
            <h2 class="title">{{$i18n.t('index.latest_Info')}}</h2>
            <div class="banner">
            </div>
            <div class="Info">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiperSlide v-for="(item,index) in InfoInquiry" :key="index">
                        <div class="Info_container">
                            <img :src="item.imgsrc">
                            <div class="Info_details" style="width:100%;">
                                <p class="subject_title" v-html="item.name"></p>
                                <div class="subject_content">
                                    {{item.info}}
                                </div>
                                <span class="btn_more_details" @click="$router.push({ path: '/info_details', query: { id:item.id }})">{{$i18n.t('index.more')}}</span>
                            </div>
                        </div>
                    </swiperSlide>
                    <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>                
                </swiper>
                <i @click="swiperPrev()" class="el-icon-arrow-left"></i>
                <i @click="swiperNext()" class="el-icon-arrow-right"></i>
            </div>

            <iframe id="frameId" src="https://www.youtube.com/embed/gJsNp0OtWYQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </center>
    </div>
    <div class="authority">
        <div class="declare" data-aos="fade-left" data-aos-offset="150">
            <span class="title">iTech Labs 国际权威机构认证</span>
            <hr>
            <p>博乐游戏旗下游戏的随机数生成(RNG)经过<a href="https://itechlabs.com/" target="_blank">国际权威机构iTech Labs</a>认证，保证游戏发牌公平性无虑，严格遵守行业相关规范和技术规格要求。</p>
            <p>iTech Labs为一家IEC/ISO 17025测试认证机构，拥有超过50年以上的丰富游戏测试和验证经验，也是目前国际市场中，最具公信力的机构之一。</p>
            <span class="more"><a href="https://itechlabs.com/certificates/BoleGaming/RNG_Certificate_BoleGaming_28122018.pdf" target="_blank">了解更多 >></a></span>
        </div>
        <div class="pic" data-aos="fade-up" data-aos-offset="150">     
        </div>
    </div>
    <div class="authority_mobile">
        <span class="title" data-aos="fade-up" data-aos-offset="0">
            iTech Labs 国际权威机构认证
            <hr>
        </span>
        
        <div data-aos="fade-up" data-aos-offset="0">
            <div class="pic">
                <img src="../assets/home/img_itechlabs.png">
            </div>
            <div class="declare">
                <p>博乐游戏随机数生成(RNG)经过<a href="https://itechlabs.com/">国际权威机构iTech Labs</a>认证，保证游戏发牌公平性。</p>
            </div>
        </div>
        <div class="btn_container" data-aos="fade-up" data-aos-offset="0">
            <a href="https://itechlabs.com/certificates/BoleGaming/RNG_Certificate_BoleGaming_28122018.pdf" target="_blank"><span>了解更多</span></a>
        </div>
    </div>
    <div id="cooperation_id" class="cooperationInfo" style="min-height:200px;position:relative;">
        <div>
        <p>{{$i18n.t('index.strength_title')}}</p>
            <img src="../assets/home/bottom_01.png" width="30%;">
            <p>{{$i18n.t('index.strength')}}</p>
        </div>
        <div>
        <p>{{$i18n.t('index.anti_cheating_title')}}</p>
        <img src="../assets/home/bottom_02.png" width="30%;">
        <p>{{$i18n.t('index.anti_cheating')}}</p>
        </div>
        <div>
        <p>{{$i18n.t('index.ultra_stable_title')}}</p>
        <img src="../assets/home/bottom_03.png" width="30%;">
        <p>{{$i18n.t('index.ultra_stable')}}</p>
        </div>
        <div>
        <p>{{$i18n.t('index.HTML5_engine_title')}}</p>
        <img src="../assets/home/bottom_04.png" width="30%;">
        <p>{{$i18n.t('index.HTML5_engine')}}</p>
        </div>
        <div>
        <p>{{$i18n.t('index.Java_title')}}</p>
        <img src="../assets/home/bottom_05.png" width="30%;">
        <p>{{$i18n.t('index.Java')}}</p>
        </div>
    </div>
</div>
</template>

<script>
import Info_Order from '~/root/Info_Item_order.json'
import 'aos/dist/aos.css';
import Parallax from 'parallax-js'
import AOS from 'aos'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data(){
        return{
            swiperOption: {
                direction: 'horizontal',
                initialSlide:0,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                breakpointsInverse: true,
                breakpoints: { 
                    100: {
                        slidesPerView: 1.2,
                        spaceBetween: 15,
                        centeredSlides: true,
                    },

                    700:{
                        slidesPerView: 4,
                        spaceBetween: 5,
                        centeredSlides: false,
                    },
                   
                    900: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                        centeredSlides: false,
                    },

                    1350: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                        centeredSlides: false,
                    }
                },
            },
            InfoInquiry:{},
            current_pointer:1,
        }
    },

    computed: {
        swiper() {
          return this.$refs.mySwiper.swiper;
        }
    },

    components: {
        swiper, 
        swiperSlide
    },

    mounted(){
        clearInterval(this.interval_id);
        AOS.init();
        this.init();
    },
    destroyed(){
        clearInterval(this.interval_id);
    },
    methods:{
        init(){
            if(this.$i18n.locale == 'en'){
                $("#Index_id").removeClass('Index_Container_CN');
                $("#Index_id").addClass('Index_Container_EN');
            }else{
                $("#Index_id").removeClass('Index_Container_EN');
                $("#Index_id").addClass('Index_Container_CN');
            }
            this.InfoInquiry = this.$utils.sorting_data(Object.values(this.$i18n.t('Info')).slice(0,3),Info_Order);
            var scene = document.getElementById('scene');   
            var parallaxInstance = new Parallax(scene, {
                relativeInput: true
            });
            this.resizeMethods();
            window.addEventListener("resize", this.resizeMethods, false);

            /*
            $( "#frameId" ).mouseenter( () =>{
                $('body').css('overflow','hidden');
            });

            $( "#frameId" ).mouseleave( () =>{
                $('body').css('overflow','auto');
            });
            */
        },

        resizeMethods(){
            if(window.innerWidth<=768 && !this.active_coroseul){
                this.handlecoroseul();
            }else if(window.innerWidth > 768 &&  this.active_coroseul){
                this.active_coroseul=false;
                clearInterval(this.interval_id);
                $("#cooperation_id div").css("opacity","1"); 
                return;
            }
        },

        swiperPrev(){
            this.swiper.slidePrev();
        },

        swiperNext(){
            this.swiper.slideNext();
        },

        handlecoroseul(){
            this.active_coroseul=true;
            $("#cooperation_id div").css("opacity","0"); 
            $("#cooperation_id div:first-child").css("opacity","1"); 
            this.interval_id = setInterval(()=>{
                $("#cooperation_id div:nth-child("+this.current_pointer+")").css("opacity","0");  
                    if( this.current_pointer  ==  5 ){
                        this.current_pointer=1;
                    } else  {
                        this.current_pointer+=1;
                    }
                    $("#cooperation_id div:nth-child("+this.current_pointer+")").css("opacity","1");
            },5000);
        },


    },

    watch:{
        '$i18n.locale' (val) {
            this.init();
        },
    }
}
</script>

<style lang="scss">
.Index_Main{
    background-color:black;
}

.Index_Container_CN{
    width:100%;
   

    @media only screen and (max-width: 768px) {
        .Banner_Top_Container{
            width:100%;
            overflow-x: hidden;
            #scene{
                width:100%;
                height:100vh;
                top:0;
                left:0;
                overflow: hidden;
                position: relative;
                .layer_bottom{
                    position:absolute;
                    img{
                        width:100%;
                        height:100vh;
                        object-fit: cover;
                        object-position:-60vw 0;
                    }
                }

                .layer_3{
                    width:inherit;
                    height:inherit;
                    position:absolute;
                    img:first-child{
                        width:13%;
                        position:absolute;
                        top:80vw;
                        left:-4vw;
                    }
                    img:last-child{
                        width:30%;
                        position:absolute;
                        top:70vw;
                        right:-15vw;
                        
                    }
                }

                .layer_2{
                    width:inherit;
                    height:inherit;
                    position:absolute;

                    img:first-child{
                        width:13%;
                        position:absolute;
                        top:15vw;
                        left:10vw;
                    }

                    img:nth-child(2){
                        width:18%;
                        position:absolute;
                        top:55vw;
                        left:-8vw;
                    }

                    img:last-child{
                        width:13%;
                        position:absolute;
                        top:55vw;
                        right:-5vw;
                        
                    }
                }

                .layer_1{
                    width:inherit;
                    height:inherit;
                    position:absolute;

                    img:first-child{
                        width:33%;
                        position:absolute;
                        bottom:-5vw;
                        right:-5vw;
                    }

                    img:nth-child(2){
                        width:40%;
                        position:absolute;
                        top:2vw;
                        right:-9vw;
                    }

                    img:nth-child(3){
                        width:38%;
                        position:absolute;
                        bottom:-7vw;
                        left:-10vw;
                    }

                    img:last-child{
                        width:30%;
                        position:absolute;
                        top:2vw;
                        left:0vw;
                        
                    }
                }
            }
            .title_container{
                position: absolute;
                top:0;
                left:0;
                width:100%;
                height:100vh;
                display:table;

                .inner_container{
                    display:table-cell;
                    vertical-align: middle;
                    text-align:center;
                    position: relative;
                    top:7vw;

                    span{
                        display:block;
                    }

                    .title{
                        font-size:10.1vw;
                        font-weight:700;
                        color:white;
                        margin-bottom:7.9vw;
                
                    }

                    .title + span{
                        display:table;
                        margin:0 auto 15.5vw auto;
                        font-size:3.7vw;
                        font-weight:700;
                        color:black;
                        span{
                            display:table;
                            margin:0 auto 2vw auto;
                            padding:3px 1.9vw;
                            background-color:rgba(255,255,255,0.8);
                        }
                    }
                    
                    .item{
                        width:80%;
                        margin:0 auto;
                        div{
                            display:inline-block;
                            width:30%;
                            text-align: center;
                            img{
                                transform:scale(0.7);
                                transform-origin: center top;
                            }
                            span{
                                display:block;
                                color:white;
                                padding-top:0;
                                font-size:3.7vw;
                                font-weight:500;
                            }
                        }
                    }
                }
            }
            .scroll_effect{
                font-size:3.2vw;
                position: absolute;
                text-align:center;
                width:100%;
                bottom:0;
                span{
                    color:white;
                    position: relative;
                    i:before{
                        font-size:2.5vw;
                        position: absolute;
                        top:0;
                        top:1.5vw
                    }
                }
                span:nth-child(3){
                    width:100%;
                    height:30px;
                    display:block;
                    margin-top:10px;
                    overflow: hidden;
                }
                span:nth-child(3):after{
                    content:'';
                    width:0px;
                    height:40px;
                    border-left:2px solid white;
                    position: absolute;
                    left:0;
                    right:0;
                    margin:auto;
                    top:2vw;
                    animation: line 1s infinite 0s linear;
                }
                @keyframes line{
                    0%{
                        top:-40px;
                    }
                    100%{
                        top:80px;
                    }
                }
            }
        }

        .lastest_Info{
            padding:17.6vw 0px 0px 0px;

            .title{
                color:black;
                padding-bottom:5.9vw;
                font-weight:700;
                font-size:6.4vw;
            }

            .banner{
                background-image:url('../assets/home/banner_mobile.gif');
                height:48vw;
                background-repeat:no-repeat;
                background-size:cover;
                background-position: center;
            }  

            .Info{
                width:100%;
                padding:5.9vw 0px 11.7vw 0px;
                position: relative;
                .Info_container{
                    background-color:white;
                    padding-bottom:35vw;
                    img{
                        width:100%;
                    }

                    .Info_details{
                        min-height:35vw;
                        background-color:white;
                        position:absolute;
                        bottom:0;
                        text-align:center;
                        padding:3.1vw 0 4.2vw 0;
                       
                        p{
                            text-align:justify;
                            margin:0 5.9vw 0 5.9vw;
                            padding-bottom:14vw;
                            overflow: hidden;
                            font-weight:500;
                            font-size:4.8vw;
                            // text-overflow: ellipsis;
                        }

                        .subject_content{
                            max-height:0;
                            opacity:0;
                            overflow: hidden;
                            text-align:left;
                            transition: max-height 1s ease 0s , opacity 1s;
                        }

                        .btn_more_details{
                            color:red;
                            border:1px solid red;
                            font-size:4.3vw;
                            padding:1.6vw 7.5vw;
                            border-radius:10px;
                            display:table;
                            margin:0 auto;
                            -webkit-transform: perspective(1px) translateZ(0) translateX(-50%);
                            transform: perspective(1px) translateZ(0) translateX(-50%);
                            position: absolute;
                            left:50%;
                            bottom:4.2vw;
                            -webkit-transition-property: color;
                            transition-property: color;
                            -webkit-transition-duration: 0.3s;
                            transition-duration: 0.3s;
                            cursor: pointer;
                            overflow: hidden;
                        }

                        .btn_more_details:before {
                            content: "";
                            position: absolute;
                            z-index: -1;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: #FF0317;
                            -webkit-transform: scaleX(0);
                            transform: scaleX(0);
                            -webkit-transform-origin: 0 50%;
                            transform-origin: 0 50%;
                            -webkit-transition-property: transform;
                            transition-property: transform;
                            -webkit-transition-duration: 0.3s;
                            transition-duration: 0.3s;
                            -webkit-transition-timing-function: ease-out;
                            transition-timing-function: ease-out;
                        
                        } 
                    }
                }

                .Info_container:hover{
                    cursor: pointer;

                    .btn_more_details{
                        color:white;
                    }
                            
                    .btn_more_details:before{
                        -webkit-transform: scaleX(1);
                        transform: scaleX(1);
                    }

                }

                i{
                    display:none;
                }
            }



            iframe{
               width:100%;
               height:56.3vw;
           }
            
        }

        .authority{
            display:none;
        }

        .authority_mobile{
            display:block;
            background-color:white;
            padding:10.7vw 7.5vw 6.9vw 7.5vw;

            .title{
                display: block;
                font-size:6.4vw;
                font-weight:700;
                color:black;
                letter-spacing: -0.3vw;
                text-align:center;
            }

            hr{
                width:30%;
                border-top:0.8vw solid #656565;
                margin:3.6vw auto 8.4vw auto;
            }

            div{
                display:flex;
                
                .pic{
                    width:27.2vw;
                    display:block;
                    text-align:center;
                    img{
                        width:100%;
                    }
                }

                .declare{
                    width:70%;
                    display:block;
                    font-size:4.3vw;
                    font-weight:500;
                    padding:0 0 0 2.1vw;
                    letter-spacing: 0.3vw;
                    line-height:7vw;
                    
                    p{
                        margin-bottom:0;
                        a{
                            color:#012592;
                        }
                    }
                }  
            }

            div.btn_container{
                display: block;
                text-align:center;
                margin:7.5vw 0 0vw 0;
                a{
                    text-decoration:none;
                    span{
                        border:1.2px solid #FF0317;
                        border-radius:10px;
                        color:#FF0317;
                        font-weight:bold;
                        padding:1.5vw 9vw;
                        display:table;
                        margin:0 auto;
                        overflow: hidden;
                        -webkit-transform: perspective(1px) translateZ(0);
                        transform: perspective(1px) translateZ(0);
                        -webkit-transition-property: color;
                        transition-property: color;
                        -webkit-transition-duration: 0.3s;
                        transition-duration: 0.3s;
                        cursor: pointer;
                        position: relative;
                    }

                    span:before {
                        content: "";
                        position: absolute;
                        z-index: -1;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: #FF0317;
                        -webkit-transform: scaleX(0);
                        transform: scaleX(0);
                        -webkit-transform-origin: 0 50%;
                        transform-origin: 0 50%;
                        -webkit-transition-property: transform;
                        transition-property: transform;
                        -webkit-transition-duration: 0.3s;
                        transition-duration: 0.3s;
                        -webkit-transition-timing-function: ease-out;
                        transition-timing-function: ease-out;
                    
                    }

                    span:hover:before{
                        -webkit-transform: scaleX(1);
                        transform: scaleX(1);
                    }

                    span:hover{
                        color:white;
                    }
                }
            }
        }

        .cooperationInfo{
            background-image:url('../assets/mobile_banner_Top/M_bottombg.png');
            background-size:cover;
            background-repeat: no-repeat;
            background-position: center;
            color:white;
            text-align:center;
            height:83vw;
            display:Grid;
            grid-auto-columns: 100%;
            grid-auto-rows: 100%;
            div{
                grid-column:1;
                grid-row:1;
                transition: all 2s ease 0s;
                opacity: 0;
                img{
                    width:19.6vw;
                }
                p{
                    width:70%;
                    margin:0 auto;
                    letter-spacing: 0.29vw;
                }
                p:first-child{
                    padding:5.9vw 0 4.8vw 0;
                    font-size:4.8vw;
                    font-weight:500;
                }
                p:last-child{
                    padding:7vw 0;
                    text-align:left;
                    font-size:4.3vw;
                    font-weight:400;
                }
            }

            div:first-child{
                opacity:1;
            }
        }

    }

    @media only screen and (min-width: 768px) {
        .Banner_Top_Container{
            position: relative;
            width:100%;
            overflow-x: hidden;
            overflow-y: hidden;
            #scene{
                width:100%;
                height:100vh;
                top:0;
                left:0;
                overflow: hidden;
                position: relative;
                .layer_bottom{
                    position: absolute;
                    img{
                        width:100%;
                        height:100vh;
                        object-fit: cover;
                        
                    }
                }

                .layer_3{
                    width:inherit;
                    height:inherit;
                    position: absolute;
                    animation:motion3 5s infinite ease;
                    img:first-child{
                        position:absolute;
                        top:28vw;
                        left:22vw;  
                    }
                    img:last-child{
                        position:absolute;
                        top:20vw;
                        right:20vw;
                    }
                }

                .layer_2{
                    width:inherit;
                    height:inherit;
                    position: absolute;
                    animation:motion2 5s infinite ease;

                    img:first-child{
                        width:10%;
                        position:absolute;
                        top:15vw;
                        left:10vw;
                    }

                    img:nth-child(2){
                        width:5%;
                        position:absolute;
                        top:23vw;
                        left:18vw;
                    }

                    img:last-child{
                        width:5%;
                        position:absolute;
                        top:15vw;
                        right:25vw;
                        
                    }
                }

                .layer_1{
                    width:inherit;
                    height:inherit;
                    position: absolute;
                    animation:motion1 5s infinite ease;

                    img:first-child{
                        width:18%;
                        position:absolute;
                        bottom:0vw;
                        right:20vw;
                    }

                    img:nth-child(2){
                        width:15%;
                        position:absolute;
                        top:2vw;
                        right:23vw;
                    }

                    img:nth-child(3){
                        width:15%;
                        position:absolute;
                        bottom:0vw;
                        left:20vw;
                    }

                    img:last-child{
                        width:15%;
                        position:absolute;
                        top:3vw;
                        left:18vw;
                        
                    }
                }

                @keyframes motion3{
                    0% {
                        top:0px;
                    }
                    50% {
                        top:20px
                    }
                    100%{
                        top:0px;
                    }
                }

                @keyframes motion2{
                    0% {
                        top:20px;
                    }
                    50% {
                        top:0px
                    }
                    100%{
                        top:20px;
                    }
                }

                @keyframes motion1{
                    0% {
                        top:0px;
                    }
                    50% {
                        top:50px
                    }
                    100%{
                        top:0px;
                    }
                }
            }
            .title_container{
                position: absolute;
                top:0;
                left:0;
                width:100%;
                height:100vh;
                display:table;

                .inner_container{
                    display:table-cell;
                    vertical-align: middle;
                    text-align:center;
                    transform:translateY(5vw);

                    .title{
                        font-size:5.3vw;
                        font-weight:700;
                        letter-spacing: 0.4vw;
                        color:white;
                    }

                    .title + span{
                        display:table;
                        margin:1.2vw auto 6vw auto;
                        font-size:1vw;
                        font-weight:700;
                        color:black;
                        background-color:rgba(255,255,255,0.8);
                        width: 39.5vw;
                        height: 2.3vw;
                        line-height: 2.3vw;
                    }
                    
                    .item{
                        width:40%;
                        margin:0 auto;
                        div{
                            display:inline-block;
                            vertical-align: top;
                            width:25%;
                            text-align: center;
                            span{
                                display:block;
                                color:white;
                                padding-top:1.8vw;
                                font-size:1vw;
                            }

                            img{
                                width:30%;
                            }
                        }

                        div:nth-child(2){
                            span{
                                padding-top:2vw;
                            }
                            img{
                                width:35%;
                            }
                        }

                        div:last-child{
                            img{
                                width:45%;
                            }
                            span{
                                padding-top:2.4vw;
                                transform: translateX(-0.3vw);
                            }
                        }
                    }
                }
            }
            .scroll_effect{
               display:none;
            }
        }
        .lastest_Info{
            padding:3.6vw 12.39vw 5.3vw 12.39vw;

            .title{
                color:black;
                margin-bottom:1.4vw;
                font-weight:700;
                font-size:1.9vw;
            }

            .banner{
                background-image:url('../assets/home/banner.gif');
                height:13vw;
                background-repeat:no-repeat;
                background-size:contain;
                background-position: center;
            }

            .Info_container{
               padding-bottom:9vw;
            }

            .Info_details{
                padding:1vw;
                min-height:9vw;
               .subject_title{
                    font-size: 1.1vw;
                    width:90%;
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical; 
                }

               .subject_content{
                   font-size:1vw;
               }
            }

            

            .Info{
                padding:1.3vw 0 0 0;
                position: relative;
                .Info_container{
                    background-color:white;
                    img{
                        width:100%;
                    }

                    .Info_details{
                        background-color:white;
                        position:absolute;
                        bottom:0;
                        text-align:center;
                        p{
                            text-align:left;
                            overflow: hidden;
                            font-weight:bold;
                            margin-bottom:0.5rem;
                            // text-overflow: ellipsis;
                        }

                        .subject_content{
                            max-height:0;
                            opacity:0;
                            overflow: hidden;
                            text-align:justify;
                            margin-bottom:2.5vw;
                            transition: max-height 1s ease 0s , opacity 1s;
                            font-size:0.8vw;
                            color:#656565;
                        }

                        .btn_more_details{
                            color:red;
                            border:1px solid red;
                            font-size:1vw;
                            padding:0.3vw 0.8vw;
                            border-radius:5px;
                            display:table;
                            -webkit-transform: perspective(1px) translateZ(0) translateX(-50%);
                            transform: perspective(1px) translateZ(0) translateX(-50%);
                            -webkit-transition-property: color;
                            transition-property: color;
                            -webkit-transition-duration: 0.3s;
                            transition-duration: 0.3s;
                            cursor: pointer;
                            position: absolute;
                            bottom:1vw;
                            left:50%;
                            overflow: hidden;

                            padding:0.2vw 1vw;
                            font-size:0.8vw;
                            min-width:4vw;
                        }

                        .btn_more_details:before {
                            content: "";
                            position: absolute;
                            z-index: -1;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: #FF0317;
                            -webkit-transform: scaleX(0);
                            transform: scaleX(0);
                            -webkit-transform-origin: 0 50%;
                            transform-origin: 0 50%;
                            -webkit-transition-property: transform;
                            transition-property: transform;
                            -webkit-transition-duration: 0.3s;
                            transition-duration: 0.3s;
                            -webkit-transition-timing-function: ease-out;
                            transition-timing-function: ease-out;
                        
                        }
                    }
                }

                .Info_container:hover{
                    cursor: pointer;
                    .subject_content{
                        max-height:1000px;
                        opacity:1;
                    }

                    .btn_more_details{
                        color:white;
                    }
                            
                    .btn_more_details:before{
                        -webkit-transform: scaleX(1);
                        transform: scaleX(1);
                    }

                }

                i:hover{
                    cursor:pointer;
                }

                i:before{
                    color:#D0D0D0;
                }

                i.el-icon-arrow-left{
                    position:absolute;
                    top:35%;
                    left:-50px;
                    transform:scale(5);
                }

                i.el-icon-arrow-right{
                    position:absolute;
                    top:35%;
                    right:-50px;
                    transform:scale(5);
                }
            }

           iframe{
               width:58.2vw;
               height:32.8vw;
           }
        }

        .authority{
            background-color:white;
            padding:4.7vw 13.9vw 4vw 12.6vw;
            justify-content:space-between;
            display:flex;

            .declare{
                width:70%;
                .title{
                    font-size:1.2vw;
                    font-weight:900;
                    margin-bottom:0.5vw;
                    display:block;
                }
                hr{
                    border-top:0.3vw solid #656565;
                    width:7vw;
                    margin:auto auto 1.5vw 0; 
                }
                p{
                    font-size:1vw;
                    line-height:2vw;
                    font-weight:600;
                    a{
                        color:#012592;
                    }
                }
                span.more{
                    float:right;
                    position: relative;
                    right:10px;
                    font-weight:bold;
                    color:#FF0317;
                    font-size:1.2vw;
                    a{
                        color:#FF0317;
                    }
                }
            }
            .pic{
                width:23%;
                height:inherit;
                background-image:url('../assets/home/img_itechlabs.png');
                background-size: 95% 95%;
                background-position: center;
                background-repeat: no-repeat;
            }
        }

        .authority_mobile{
            display:none;
        }

        .cooperationInfo{
            height:41.8vw;
            background-image:url('../assets/home/bottombg.png');
            background-size:cover;
            background-position: center;
            display:grid;
            grid-template-columns: repeat(5 , 20%);
            color:white;
            text-align:center;
            font-size:0.8vw;
            position: relative;
            div{
                padding:3.6vw 0 6.5vw 0;
                z-index:1;
                p{
                    margin:0 2.8vw;
                }
                p:first-child{
                    padding-bottom:8.8vw;
                    font-size:1.2vw;
                    font-weight:200;
                }

                p:last-child{
                    padding-top:8.5vw;
                    font-size:0.9vw;
                    text-align:justify;
                    letter-spacing:0.02vw;
                }
            }

            div:hover{
                background-color:rgba(0,0,0,0.5);
            }
        }

    }

    
    .lastest_Info{
        background-color:#F7F7F7;
       
    }

}

.Index_Container_EN{
     width:100%;
   
     @media only screen and (max-width: 900px) {
         .Banner_Top_Container{
             width:100%;
             overflow-x: hidden;
             #scene{
                 width:100%;
                 height:100vh;
                 top:0;
                 left:0;
                 overflow: hidden;
                 position: relative;
                 .layer_bottom{
                     position:absolute;
                     img{
                         width:100%;
                         height:100vh;
                         object-fit: cover;
                     }
                 }

                 .layer_3{
                     width:inherit;
                     height:inherit;
                     position:absolute;
                     img:first-child{
                         width:13%;
                         position:absolute;
                         top:80vw;
                         left:-4vw;
                     }
                     img:last-child{
                         width:30%;
                         position:absolute;
                         top:70vw;
                         right:-15vw;
                        
                     }
                 }

                 .layer_2{
                     width:inherit;
                     height:inherit;
                     position:absolute;

                     img:first-child{
                         width:13%;
                         position:absolute;
                         top:15vw;
                         left:10vw;
                     }

                     img:nth-child(2){
                         width:18%;
                         position:absolute;
                         top:55vw;
                         left:-8vw;
                     }

                     img:last-child{
                         width:13%;
                         position:absolute;
                         top:55vw;
                         right:-5vw;
                        
                     }
                 }

                 .layer_1{
                     width:inherit;
                     height:inherit;
                     position:absolute;

                     img:first-child{
                         width:33%;
                         position:absolute;
                         bottom:-5vw;
                         right:-5vw;
                     }

                     img:nth-child(2){
                         width:40%;
                         position:absolute;
                         top:2vw;
                         right:-9vw;
                     }

                     img:nth-child(3){
                         width:38%;
                         position:absolute;
                         bottom:-7vw;
                         left:-10vw;
                     }

                     img:last-child{
                         width:30%;
                         position:absolute;
                         top:2vw;
                         left:0vw;
                        
                     }
                 }
             }
             .title_container{
                 position: absolute;
                 top:0;
                 left:0;
                 width:100%;
                 height:100vh;
                 display:table;

                 .inner_container{
                     display:table-cell;
                     vertical-align: middle;
                     text-align:center;

                     span{
                         display:block;
                     }

                     .title{
                         font-size:5vw;
                         font-weight:900;
                         color:white;
                         margin-bottom:5vw;
                
                     }

                     .title + span{
                         display:table;
                         margin:0 auto 5vw auto;
                         font-size:3vw;
                         font-weight:bold;
                         color:black;
                         span{
                             display:table;
                             margin:0 auto 2vw auto;
                             padding:3px 10px;
                             background-color:rgba(255,255,255,0.8);
                         }
                     }
                    
                     .item{
                         width:80%;
                         margin:0 auto;
                         display:flex;
                         justify-content: space-around;
                         div{
                             display:block;
                             text-align: center;
                             img{
                                 transform:scale(0.7);
                                 transform-origin: center bottom;
                             }
                             span{
                                 display:block;
                                 color:white;
                                 padding-top:3vw;
                             }
                         }
                         div:last-child{
                             img{
                                 width:115%;
                             }
                         }
                     }
                 }
             }
         }

         .lastest_Info{
             padding:50px 0px;
             .banner{
                 background-image:url('../assets/home/banner_mobile.gif');
                 height:45vw;
                 background-repeat:no-repeat;
                 background-size:cover;
                 background-position: center;
                 margin-bottom:2vw;
             }  

             .title{
                 color:black;
                 padding-bottom:5vw;
                 font-weight:bold;
             }

             .Info{
                 width:90%;
                 padding:50px 0px;
                 .Info_container{
                     background-color:white;
                     padding-bottom:150px;
                     img{
                         width:100%;
                     }

                     .Info_details{
                         background-color:white;
                         position:absolute;
                         bottom:0;
                         text-align:center;
                         p{
                             text-align:left;
                             overflow: hidden;
                             font-weight:bold;
                             text-overflow: ellipsis;
                             display: -webkit-box;
                             -webkit-line-clamp: 2;
                             -webkit-box-orient: vertical;
                         }

                         .subject_content{
                             max-height:0;
                             opacity:0;
                             overflow: hidden;
                             text-align:left;
                             margin-bottom:1vw;
                             transition: max-height 1s ease 0s , opacity 1s;
                         }

                         .btn_more_details{
                             color:red;
                             border:1px solid red;
                             font-size:14px;
                             padding:5px 10px;
                             border-radius:5px;
                             display:table;
                             margin:0 auto;
                             -webkit-transform: perspective(1px) translateZ(0);
                             transform: perspective(1px) translateZ(0);
                             position: relative;
                             -webkit-transition-property: color;
                             transition-property: color;
                             -webkit-transition-duration: 0.3s;
                             transition-duration: 0.3s;
                             cursor: pointer;
                         }

                         .btn_more_details:before {
                             content: "";
                             position: absolute;
                             z-index: -1;
                             top: 0;
                             left: 0;
                             right: 0;
                             bottom: 0;
                             background: #FF0317;
                             -webkit-transform: scaleX(0);
                             transform: scaleX(0);
                             -webkit-transform-origin: 0 50%;
                             transform-origin: 0 50%;
                             -webkit-transition-property: transform;
                             transition-property: transform;
                             -webkit-transition-duration: 0.3s;
                             transition-duration: 0.3s;
                             -webkit-transition-timing-function: ease-out;
                             transition-timing-function: ease-out;
                        
                         } 
                     }
                 }

                 .Info_container:hover{
                     cursor: pointer;

                     .btn_more_details{
                         color:white;
                     }
                            
                     .btn_more_details:before{
                         -webkit-transform: scaleX(1);
                         transform: scaleX(1);
                     }

                 }

                
             }

             .Info_container{
                padding-bottom:10vw;
                .Info_details{
                    padding:1vw;
                }
             } 

             iframe{
                width:100%;
                height:200px;
            }
            
         }

         .cooperationInfo{
             background-image:url('../assets/mobile_banner_Top/M_bottombg.png');
             background-size:cover;
             background-repeat: no-repeat;
             background-position: center;
             color:white;
             text-align:center;
             font-size:3.5vw;
             height:78vw;
             display:Grid;
             grid-auto-columns: 100%;
             grid-auto-rows: 100%;
             div{
                 grid-column:1;
                 grid-row:1;
                 transition: all 2s ease 0s;
                 opacity: 0;
                 img{
                     transform:scale(0.7);
                 }
                 p{
                     width:90%;
                     margin:0 auto;
                     padding:5vw 0;
                 }
                 p:first-child{
                     font-size:5vw;
                 }
             }

             div:first-child{
                 opacity:1;
             }
         }

     }

     @media only screen and (max-width: 700px){
         .lastest_Info{
             .Info_container{
                padding-bottom:20vw;

                .Info_details{
                     padding:2vw;
                     .subject_title{
                         font-size: 18px;
                     }

                     .subject_content{
                         font-size:15px;
                     }
                 }
            }

           
         }
     }

     @media only screen and (min-width: 900px) {
         .Banner_Top_Container{
             width:100%;
             overflow-x: hidden;
             #scene{
                 width:100%;
                 height:100vh;
                 top:0;
                 left:0;
                 overflow: hidden;
                 position: relative;
                 .layer_bottom{
                     position: absolute;
                     img{
                         width:100%;
                         height:100vh;
                         object-fit: cover;
                        
                     }
                 }

                 .layer_3{
                     width:inherit;
                     height:inherit;
                     position: absolute;
                     animation:motion3 5s infinite ease;
                     img:first-child{
                         position:absolute;
                         top:28vw;
                         left:22vw;  
                     }
                     img:last-child{
                         position:absolute;
                         top:20vw;
                         right:20vw;
                     }
                 }

                 .layer_2{
                     width:inherit;
                     height:inherit;
                     position: absolute;
                     animation:motion2 5s infinite ease;

                     img:first-child{
                         width:10%;
                         position:absolute;
                         top:15vw;
                         left:10vw;
                     }

                     img:nth-child(2){
                         width:5%;
                         position:absolute;
                         top:23vw;
                         left:18vw;
                     }

                     img:last-child{
                         width:5%;
                         position:absolute;
                         top:15vw;
                         right:25vw;
                        
                     }
                 }

                 .layer_1{
                     width:inherit;
                     height:inherit;
                     position: absolute;
                     animation:motion1 5s infinite ease;

                     img:first-child{
                         width:18%;
                         position:absolute;
                         bottom:0vw;
                         right:20vw;
                     }

                     img:nth-child(2){
                         width:15%;
                         position:absolute;
                         top:2vw;
                         right:23vw;
                     }

                     img:nth-child(3){
                         width:15%;
                         position:absolute;
                         bottom:0vw;
                         left:20vw;
                     }

                     img:last-child{
                         width:15%;
                         position:absolute;
                         top:3vw;
                         left:18vw;
                        
                     }
                 }

                 @keyframes motion3{
                     0% {
                         top:0px;
                     }
                     50% {
                         top:20px
                     }
                     100%{
                         top:0px;
                     }
                 }

                 @keyframes motion2{
                     0% {
                         top:20px;
                     }
                     50% {
                         top:0px
                     }
                     100%{
                         top:20px;
                     }
                 }

                 @keyframes motion1{
                     0% {
                         top:0px;
                     }
                     50% {
                         top:50px
                     }
                     100%{
                         top:0px;
                     }
                 }
             }
             .title_container{
                 position: absolute;
                 top:0;
                 left:0;
                 width:100%;
                 height:100vh;
                 display:table;

                 .inner_container{
                     display:table-cell;
                     vertical-align: middle;
                     text-align:center;

                     .title{
                         font-size:4vw;
                         font-weight:900;
                         color:white;
                         margin-bottom:0.5vw;
                     }

                     .title + span{
                         display:table;
                         margin:30px auto 50px auto;
                         font-size:0.9vw;
                         font-weight:bold;
                         color:black;
                         padding:5px 20px;
                         background-color:rgba(255,255,255,0.8);
                     }
                    
                     .item{
                         width:40%;
                         margin:0 auto;
                         div{
                             display:inline-block;
                             width:30%;
                             text-align: center;
                             span{
                                 display:block;
                                 color:white;
                                 padding-top:2vw;
                             }
                         }
                     }
                 }
             }
         }
         .lastest_Info{
             padding:50px 12vw 100px 12vw;
             .banner{
                 background-image:url('../assets/home/banner.gif');
                 height:15vw;
                 background-repeat:no-repeat;
                 background-size:contain;
                 background-position: center;
             }

             .Info_container{
                padding-bottom:8vw;
             }

             .Info_details{
                 padding:1vw;
                .subject_title{
                    font-size: 12px;
                    text-overflow: ellipsis;
                    white-space:nowrap;
                    width:80%;
                    overflow:hidden;
                }

                .subject_content{
                    font-size:12px;
                }
             }

             .title{
                 color:black;
                 font-weight:900;
             }

             .Info{
                 padding:50px 0px;
                 .Info_container{
                     background-color:white;
                     img{
                         width:100%;
                     }

                     .Info_details{
                         background-color:white;
                         position:absolute;
                         bottom:0;
                         text-align:center;
                         p{
                             text-align:left;
                             overflow: hidden;
                             font-weight:bold;
                              text-overflow: ellipsis;
                         }

                         .subject_content{
                             max-height:0;
                             opacity:0;
                             overflow: hidden;
                             text-align:left;
                             margin-bottom:1vw;
                             transition: max-height 1s ease 0s , opacity 1s;
                         }

                         .btn_more_details{
                             color:red;
                             border:1px solid red;
                             font-size:14px;
                             padding:5px 10px;
                             border-radius:5px;
                             display:table;
                             margin:0 auto;
                             -webkit-transform: perspective(1px) translateZ(0);
                             transform: perspective(1px) translateZ(0);
                             position: relative;
                             -webkit-transition-property: color;
                             transition-property: color;
                             -webkit-transition-duration: 0.3s;
                             transition-duration: 0.3s;
                             cursor: pointer;
                         }

                         .btn_more_details:before {
                             content: "";
                             position: absolute;
                             z-index: -1;
                             top: 0;
                             left: 0;
                             right: 0;
                             bottom: 0;
                             background: #FF0317;
                             -webkit-transform: scaleX(0);
                             transform: scaleX(0);
                             -webkit-transform-origin: 0 50%;
                             transform-origin: 0 50%;
                             -webkit-transition-property: transform;
                             transition-property: transform;
                             -webkit-transition-duration: 0.3s;
                             transition-duration: 0.3s;
                             -webkit-transition-timing-function: ease-out;
                             transition-timing-function: ease-out;
                        
                         }
                     }
                 }

                 .Info_container:hover{
                     cursor: pointer;
                     .subject_content{
                         max-height:1000px;
                         opacity:1;
                     }

                     .btn_more_details{
                         color:white;
                     }
                            
                     .btn_more_details:before{
                         -webkit-transform: scaleX(1);
                         transform: scaleX(1);
                     }

                 }
             }

            iframe{
                width:80%;
                height:30vw;
            }
         }

         .cooperationInfo{
             height:auto;
             background-image:url('../assets/home/bottombg.png');
             background-size:cover;
             background-position: center;
             display:grid;
             grid-template-columns: repeat(5 , 20%);
             color:white;
             text-align:center;
             font-size:0.8vw;
             div{
                 padding:2vw 0;
                 p{
                     width:50%;
                     margin:0 auto;
                 }
                 p:first-child{
                     height:7vw;
                     font-size:1vw;
                 }

                 p:last-child{
                     padding-top:5vw;
                 }
             }

             div:hover{
                 background-color:rgba(0,0,0,0.5);
             }
         }
     }

     @media only screen and (min-width: 1350px){
         .lastest_Info{
            .Info_container{
                padding-bottom:8vw;
            }

            .Info_details{
                padding:1vw;
                .subject_title{
                    font-size: 14px;
                }
                .subject_content{
                    font-size:14px;
                }
            }
         }
     }

    
     .lastest_Info{
         background-color:#F7F7F7;
       
     }

 }
</style>
<style lang="scss">
@media only Screen and (max-width:768px){
    .lastest_Info{
        .swiper-container{
            // overflow: visible;
            // overflow-x: hidden;
            padding-bottom:12.6vw;
        }

        .swiper-slide{
            height:auto !important;
            -webkit-box-shadow:2px 2px 5px 1px rgba(0,0,0,0.15);
            -moz-box-shadow:2px 2px 5px 1px rgba(0,0,0,0.15);
            box-shadow: 2px 2px 5px 1px rgba(0,0,0,0.15);
        }

        .swiper-pagination-bullets{
            bottom:0;
            .swiper-pagination-bullet-active{
                background:#FF2E46;
            }
        }
    }
}

@media only Screen and (min-width:768px){
    .lastest_Info{
        .swiper-container{
            // overflow: visible;
            // overflow-x: hidden;
            padding-bottom:3.1vw;
            margin-bottom:5.3vw;
        }

        .swiper-slide{
            height:auto !important;
            -webkit-box-shadow:2px 2px 5px 1px rgba(0,0,0,0.15);
            -moz-box-shadow:2px 2px 5px 1px rgba(0,0,0,0.15);
            box-shadow: 2px 2px 5px 1px rgba(0,0,0,0.15);
        }

        .swiper-pagination-bullets{
            bottom:0vw !important;
            .swiper-pagination-bullet{
               transform:scale(0.8);
               margin:0 0.1vw;
            }
            .swiper-pagination-bullet-active{
                background:#FF2E46;
            }
        }
    }
}

</style>