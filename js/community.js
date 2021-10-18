const btnCall = document.querySelector(".btnMo");
const menuMo = document.querySelector(".Mob");

btnCall.onclick = function(e){
    e.preventDefault();

    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}

const $menu = $(".menu");
const $btn = $menu.find("dt a");
const $boxs = $menu.find("dd");
const $numBtn = $(".numbers").find("a");


$btn.on("click focusin", function(e){
    e.preventDefault();

    let isOn = $(this).hasClass("on");
    if(isOn) return;

    let target = $(this).attr("href");

    $boxs.hide();
    $btn.removeClass("on");

    $(this).addClass("on");
    $(target).show();
});

$numBtn.on("click", function(e){
    e.preventDefault();

    $numBtn.removeClass("on");
    $(this).addClass("on");
});