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

const $menu = $(".menu");
const $btn = $menu.find("dt a");
const $boxs = $menu.find("dd");
const $numBtn = $(".numbers").find("a");
const $menu2 = $("#menu2");
const $dt = $menu2.find("dt");
const $dd =$menu2.find("dd");
const $menu3 = $("#menu3");
const $dt2 = $menu3.find("dt");
const $dd2 =$menu3.find("dd");



$btn.on("click focusin", function(e){
    e.preventDefault();

    let isOn = $(this).hasClass("on");
    if(isOn) return;

    let target = $(this).attr("href");

    $boxs.hide();
    $btn.removeClass("on");

    $(this).addClass("on");
    $(target).show();

    $dt.removeClass("on");
    $dt2.removeClass("on");
});

$dt.on("click", function(e){
    e.preventDefault();

    let isOn = $(this).hasClass("on");

    $dt.removeClass("on");
    $dt.next().slideUp();

    if(isOn){
        $(this).removeClass("on");
        $(this).next().slideUp(500);    
    }else{
        $(this).addClass("on");
        $(this).next().slideDown(500);
    }
});


$dt2.on("click", function(e){
    e.preventDefault();

    let isOn = $(this).hasClass("on");

    $dt2.removeClass("on");
    $dt2.next().slideUp();

    if(isOn){
        $(this).removeClass("on");
        $(this).next().slideUp(500);    
    }else{
        $(this).addClass("on");
        $(this).next().slideDown(500);
    }
});

$numBtn.on("click", function(e){
    e.preventDefault();

    $numBtn.removeClass("on");
    $(this).addClass("on");
});

