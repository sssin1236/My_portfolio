const btnCall = document.querySelector(".btnMo");
const menuMo = document.querySelector(".Mob");
const $article = $("article");
const $txt = $("#visual .txt");
const $top = $(".line1");
const $right = $(".line2");
const $bottom = $(".line3");
const $left = $(".line4");
const $dots = $("span");
let isCookie = document.cookie.indexOf("popup=done");
let num1 = num2 = num3 = 450;

btnCall.onclick = function(e){
    e.preventDefault();

    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}


//--------------------------------jQuery----------------------------------------
class MyScroll{
    constructor(option){
        this.init(option);
        this.bindingEvent();
    }
    
    init(option){
        this.boxs = $(option.panel);
        this.btns = $(option.btns);
        this.posArr = [];
        this.enableAtv = true;
        this.baseLine = option.base;
        this.speed = option.speed;
    }
    
    bindingEvent(){
        this.setPos();
    
        $(window).on("resize", ()=>{
            this.setPos();
            let activeindex = this.btns.children("a").filter(".on").parent().index();
            this.activeScroll(activeindex);
        });
    
        $(window).on("scroll", ()=>{
            let scroll = $(window).scrollTop();
            this.activation(scroll);
        });
    
        // this.boxs.on("mousewheel", (e)=>{
        //     e.preventDefault();
    
        //     if(this.enableAtv){
        //         this.enableAtv = false;
    
        //         let i = $(e.currentTarget).index();
        
        //         if(e.originalEvent.deltaY > 0){
        //             this.activeScroll(i+1);
        //         }else{
        //             this.activeScroll(i-1);
        //         }
        //     }
        // });
    
    
        this.btns.on("click", (e)=>{
            e.preventDefault();
            let isOn = $(e.currentTarget).children("a").hasClass("on");
            if(isOn) return;
    
            if(this.enableAtv){
                this.enableAtv = false;
    
                let target = $(e.currentTarget).index();
                this.activeScroll(target);
            }
        });
    }
    
    
    
    setPos(){
        this.posArr = [];
        this.boxs.each(index=>{
            this.posArr.push(this.boxs.eq(index).offset().top);
        });
    }
    
    activation(scroll){
        this.boxs.each(index=>{
            if(scroll >= this.posArr[index] + this.baseLine){
                this.btns.children("a").removeClass("on");
                this.btns.eq(index).children("a").addClass("on");
    
                this.boxs.removeClass("on");
                this.boxs.eq(index).addClass("on");
            }
        });
    }
    
    activeScroll(index){
        $("html, body").stop().animate({ scrollTop :this.posArr[index]}, this.speed, ()=>{
            this.enableAtv = true;
        });
    }
}

// 쿠키 팝업-------------------------------------------------------------------

console.log(isCookie);

// if(isCookie === -1){
//     $("#popup").show();
// }else{
//     $("#popup").hide();
// }

$("#popup .content .close").on("click", function(e){
    e.preventDefault();

    let isChecked = $("#popup").find("input[type=checkbox]").is(":checked");

    if(isChecked) setCookie(1);

    $("#popup").slideUp(500);
});

$("#ck").on("click", function(){
    let isChecked = $("#popup").find("input[type=checkbox]").is(":checked");
    if(isChecked){
        $(".icon").addClass("on");
    }else{
        $(".icon").removeClass("on");
    }
});


function setCookie(time){
    let today = new Date();
    let date = today.getDate();

    today.setDate(date + time);

    let duedate = today.toGMTString();

    document.cookie = "popup=done; expires"+duedate;
}


//visual motion ----------------------------------------------------------------
letter(".left>h1", 0.1);

$(window).on("load", function(){
    $(".textBox").addClass("on");
    $(".left").addClass("on");
    $(".right").addClass("on");
    timer1 = setInterval(numCount1, 10);
    timer2 = setInterval(numCount2, 50);
    timer3 = setInterval(numCount3, 30);
});

$(".right>article").on("click", function(){
    let vid = $(this).find("video").attr("src");
    $(this).addClass("on");
    $(".popVid").find("video").attr("src", vid);
    $(".popVid").addClass("on");
});

$(".popclose").on("click", function(){
    $(this).parent().removeClass("on");
    $(".right>article").removeClass("on");
})


//gnb menu -----------------------------------------------------------------------
$("#gnb>li").on("mouseenter", function(){
    $(this).find(".subMenu").show();
});

$("#gnb>li").on("mouseleave",function(){
    $(this).find(".subMenu").hide();
});

$("#gnb>li").each(function(index){
    $("#gnb>li").eq(index).find("a").on("focusin",function(){
        $("#gnb>li").eq(index).find(".subMenu").show();            
    });

     $("#gnb>li").eq(index).find("a").last().on("focusout", function(){
        $("#gnb>li").eq(index).find(".subMenu").hide();
     })  ; 
})

$("dt").on("click", function(){

    let isOn = $(this).hasClass("on");
    
    $("dt").removeClass("on");
    $("dt").next().slideUp(500);

    if(isOn){
        $(this).removeClass("on");
        $(this).next().slideUp(500);
    }else{
        $(this).addClass("on");
        $(this).next().slideDown(500);
    }
});



// 스와이퍼 -----------------------------------------------------------------------


const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    speed : 500,
    spaceBetween : 0,
    slidesPerView: "auto",
    autoplay:{
        delay: 1300,
        disableOnInteraction : true 
    },
    coverflowEffect: {
        rotate: 50,
        stretch: -100,
        depth: 400,
        modifier: 1,
        slideShadows: true,
    },
    
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

const btnStart = document.querySelector(".btnStart");
const btnStop = document.querySelector(".btnStop");

swiper.autoplay.stop();

btnStart.onclick = function(){
    swiper.autoplay.start();
}

btnStop.onclick = function(){
    swiper.autoplay.stop();
}





function numCount1() {
    num1++;
    if (num1 > 1135) {
        clearInterval(timer1);
    } else {
        $(".count1").text(num1);
    }
}

function numCount2() {
    num2++;
    if (num2 > 507) {
        clearInterval(timer2);
    } else {
        $(".count2").text(num2);
    }
}

function numCount3() {
    num3++;
    if (num3 > 798) {
        clearInterval(timer3);
    } else {
        $(".count3").text(num3);
    }
}

function letter(item, interval){
    const target = $(item);
    const txt = target.text();
    let num = 0;

    $(item).empty();

    for(let el of txt){
        target.append(
            $("<span>")
            .text(el)
            .css({
                transitionDelay: interval * num+"s",
                display: "inline-block"
            })
        )
        num++;
    }
}