const btnCall = document.querySelector(".btnMo");
const menuMo = document.querySelector(".Mob");

btnCall.onclick = function(e){
    e.preventDefault();

    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}


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

$("input[type=submit]").on("click", function(e){
    e.preventDefault();
    
});