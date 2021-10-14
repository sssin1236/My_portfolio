const btnCall = document.querySelector(".btnMo");
const menuMo = document.querySelector(".Mob");

btnCall.onclick = function(e){
    e.preventDefault();

    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}

//-------------------------------------------------------------------------------

const $boxs = $(".myScroll");

let posArr = [];
let len = $boxs.length;
let plusLine = -250;

for(let i=0; i<len; i++){
    posArr.push($boxs.eq(i).offset().top);
}

$(window).on("resize", function(){
    posArr = [];
    for(let i=0; i<len; i++){
        posArr.push($boxs.eq(i).offset().top);
    }
});

$(window).on("scroll", function(){
    let scroll = $(this).scrollTop();

    for(let i=0; i<len; i++){
        if(scroll >= posArr[i] + plusLine){
            $boxs.removeClass("on");
            $boxs.eq(i).addClass("on");
        }
    }
});