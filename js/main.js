const btnCall = document.querySelector(".btnMo");
const menuMo = document.querySelector(".Mob");

btnCall.onclick = function(e){
    e.preventDefault();

    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}


//--------------------------------jQuery----------------------------------------

const $article = $("article");
const $txt = $("#visual .txt");
const $top = $(".line1");
const $right = $(".line2");
const $bottom = $(".line3");
const $left = $(".line4");
const $dots = $("span");
const $btns = $("#navi li");
const $boxs = $(".myScroll");

let speed = 700;
let isOn = $article.hasClass("on");
let posArr = [];
let len2 = $btns.length;
let baseLine = -250;

for(let i=0; i<len2; i++){
    posArr.push($boxs.eq(i).offset().top);
}

$(window).on("resize", function(){
    posArr = [];
    for(let i=0; i<len2; i++){
        posArr.push($boxs.eq(i).offset().top);
    }
});

$(window).on("scroll", function(){
    let scroll = $(this).scrollTop();

    for(let i=0; i<len2; i++){
        if(scroll >= posArr[i] + baseLine){
            $btns.children("a").removeClass("on");
            $btns.eq(i).children("a").addClass("on");

            $boxs.removeClass("on");
            $boxs.eq(i).addClass("on");
        }
    }
});


$("#navi li a").on("click", function(e){
    e.preventDefault();

    let target = $(this).attr("href");

    let targetPos = $(target).offset().top;

    $("html, body").animate({
        scrollTop : targetPos
    }, 1000);
});


// 쿠키 팝업-------------------------------------------------------------------
let isCookie = document.cookie.indexOf("popup=done");
console.log(isCookie);

if(isCookie == -1){
    $("#popup").show();
}else{
    $("#popup").hide();
}

$("#popup .content .close").on("click", function(e){
    e.preventDefault();

    let isChecked = $("#popup").find("input[type=checkbox]").is(":checked");

    if(isChecked) setCookie(1);

    $("#popup").slideUp(500);
});

function setCookie(time){
    let today = new Date();
    let date = today.getDate();

    today.setDate(date + time);

    let duedate = today.toGMTString();

    document.cookie = "popup=done; expires"+duedate;
}