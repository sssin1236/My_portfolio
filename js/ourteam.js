const btnCall = document.querySelector(".btnMo");
const menuMo = document.querySelector(".Mob");

btnCall.onclick = function(e){
    e.preventDefault();

    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}

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

const $mem = $(".mem");
const $article = $mem.find("article");


$(".career").on("click", function(){

    let has = $(this).hasClass("on");
    if(has){
        $(this).removeClass("on");
        $(this).parent().siblings(".pic").css({opacity: 1});
    }else{
        $(this).addClass("on");
        $(this).parent().siblings(".pic").css({opacity: 0});
    }
    
});

$(".career a").on("click", function(e){
    e.preventDefault();
});


letter(".sliding1", 700, 0);
letter(".sliding2", 500, 700);
letter(".sliding3", 500, 800);

function letter(el, speed, delay){
    const bgColor = $(el).children().css("color");

    $(el).append(
        $("<em class='mask'>")
            .css({
                display: "block",
                width: "100%",
                height: "100%",
                backgroundColor: bgColor,
                position: "absolute",
                top: 0,
                left: "-100%",
            })
    );

    $(el).find(".mask").stop().delay(delay).animate({ left: 0}, speed, "easeInExpo", function(){
        $(this).prev().css({ opacity: 1});
        $(this).stop().animate({ left: "100%"}, speed, "easeInExpo", function(){
            $(this).remove();
        });
    });
}

const base = -500;
let pos = [];


$(".member>#box").each(function(_, data){
    pos.push($(data).offset().top);
});

$(window).on("scroll", function(){
    let scroll = $(this).scrollTop();
    init();

    $(".member>#box").each(function(index){
        if(scroll >= pos[index] + base){
            custom[index](scroll);
        }
    });
});

let custom = [
    function(scroll){
        let current_scroll = 2-scroll/400;
        var opacity_scroll = scroll/1000 * 2;
        let scale_scroll;
        (current_scroll <= 1) ? scale_scroll = 1 : scale_scroll = current_scroll;

        $(".intro>.inner").find(".pic").css({ transform: "scale("+scale_scroll+")", opacity: 0+opacity_scroll});
    },

    function(scroll){
        let current_scroll = scroll - pos[1];
        let right = 100 - current_scroll;
        let left = 300 - current_scroll;
        let right_scroll;
        let left_scroll;
        (right <= -20) ? right_scroll = -20 : right_scroll = right;
        (left <= -20) ? left_scroll = -20 : left_scroll = left;

        $(".year").css({ right: right_scroll + "px"});
        $(".year2").css({ left: left_scroll + "px"});
        $(".year3").css({ right: right_scroll + "px"});
    }
]

let init = function(){
    $(".intro>.inner").find(".pic").css({ transform: "scale(1)", opacity: 1});
}