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

letter("b",220, 0, 0);
letter(".sliding2", 80, 220, 1000);
letter(".sliding3", 80, 300, 2000);

function letter(el, ht, top, delay){
    const selector = $(".sliding1").children(el);
    const bgColor = selector.css("color");

    selector.append(
        $("<em class='mask'>")
            .css({
                display: "block",
                width: "50%",
                height: ht,
                backgroundColor: bgColor,
                position: "absolute",
                top: top,
                left: "-100%"
            })
    );

    selector.find(".mask").stop().delay(delay).animate({ left: 0}, 1000, function(){
        $(this).prev(el).css({ opacity: 1});
        $(this).stop().animate({ left: "100%"}, 1000, function(){
            $(this).remove();
        });
    });
}