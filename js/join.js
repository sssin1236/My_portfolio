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

    if(!isID('userid', 4, 10)) e.preventDefault();
    if(!isPwd('pwd1', 'pwd2', 8, 15)) e.preventDefault();
});


$("input[name=userid]").on("keyup", function(){
    len =4;
    len2 =len+6;

    let txt = $(this).val();

    if(txt.length >= len && txt.length < len2){
        $(this).parent().find("p").css({ color: "#111"});
    }else{
        $(this).parent().find("p").css({ color: "rgb(255, 91, 32)"});
    }
});


function isID(name, len, len2){

    if(len == undefined) len =4;
    if(len2 == undefined) len2 =len+6;

    let txt = $("input[name="+name+"]").val();
    let targetPos = $("input[name="+name+"]").offset().top + -500;

    if(txt.length >= len && txt.length < len2){
        $("input[name="+name+"]").parent().find("p").css({ color: "#111"});
        return true;
    }else{
        $("html, body").animate({ scrollTop : targetPos }, 500);
        $("input[name="+name+"]").focus();
        return false;
    }
}


function isPwd(name1, name2, len, len2){

    if(len == undefined) len =8;
    if(len2 == undefined) len2 =15;

    let pwd1 = $("input[name="+name1+"]").val();
    let pwd2 = $("input[name="+name2+"]").val();
    let targetPos = $("input[name="+name1+"]").offset().top + -500;

    let num = /[0-9]/;
    let eng = /[a-zA-Z]/;
    let spc = /[~!@#$%^&*()_+|\[\]-]/;

    if(pwd1 === pwd2 && pwd1.length >=len && num.test(pwd1) && eng.test(pwd1) && spc.test(pwd1)){
        $("input[name="+name1+"]").parent().find("p").css({ color: "#111"});
        return true;
    }else{
        $("html, body").animate({ scrollTop : targetPos }, 500);
        $("input[name="+name1+"]").focus();
        return false;
    }
}