const btnCall = document.querySelector(".btnMo");
const menuMo = document.querySelector(".Mob");

btnCall.onclick = function(e){
    e.preventDefault();

    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}

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