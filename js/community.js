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


$btn.on("click", function(e){
    e.preventDefault();

    let target = $(this).attr("href");

    $boxs.hide();
    $btn.removeClass("on");

    $(this).addClass("on");
    $(target).show();
});