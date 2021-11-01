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
    if(!isPwd('pwd1', 8, 15)) e.preventDefault();
    if(!isPwd2('pwd1', 'pwd2')) e.preventDefault();
    if(!phon('call')) e.preventDefault();
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

$("input[name=pwd1]").on("keyup", function(){
    len =8;
    len2 =15;

    let txt = $(this).val();
    let num = /[0-9]/;
    let eng = /[a-zA-Z]/;
    let spc = /[~!@#$%^&*()_+|\[\]-]/;

    if(txt.length >= len && txt.length < len2 && eng.test(txt)){
        $(this).parent().find("p").eq(0).css({ color: "#111"});
    }else{
        $(this).parent().find("p").eq(0).css({ color: "rgb(255, 91, 32)"});
    }if(spc.test(txt)){
        $(this).parent().find("p").eq(1).css({ color: "#111"});
    }else{
        $(this).parent().find("p").eq(1).css({ color: "rgb(255, 91, 32)"});
    }if(num.test(txt)){
        $(this).parent().find("p").eq(2).css({ color: "#111"});
    }else{
        $(this).parent().find("p").eq(2).css({ color: "rgb(255, 91, 32)"});
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


function isPwd(name, len, len2){

    if(len == undefined) len =8;
    if(len2 == undefined) len2 =15;

    let pwd1 = $("input[name="+name+"]").val();
    let targetPos = $("input[name="+name+"]").offset().top + -500;

    let num = /[0-9]/;
    let eng = /[a-zA-Z]/;
    let spc = /[~!@#$%^&*()_+|\[\]-]/;

    if(pwd1.length >=len && num.test(pwd1) && eng.test(pwd1) && spc.test(pwd1)){
        $("input[name="+name+"]").parent().find("p").css({ color: "#111"});
        return true;
    }else{
        $("html, body").animate({ scrollTop : targetPos }, 500);
        $("input[name="+name+"]").focus();
        return false;
    }
}

function isPwd2(name1, name2){
    let pwd1 = $("input[name="+name1+"]").val();
    let pwd2 = $("input[name="+name2+"]").val();
    let targetPos = $("input[name="+name2+"]").offset().top + -500;

    if(pwd1 === pwd2){
        $("input[name="+name2+"]").parent().find("p").remove();
        return true;
    }else{
        $("input[name"+name2+"]").parent().find("p").remove(); 
        $("input[name="+name2+"]").parent().append(
            "<p>비밀번호를 동일하게 입력해주세요.</p>"
        )
        $("html, body").animate({ scrollTop : targetPos }, 500);
        $("input[name="+name2+"]").focus();
        return false;
    }
}

function phon(name){
    let call = $("input[name="+name+"]").val();
    let sel = $("select[name"+name+"]").children("option:selected").val(); 
    let targetPos = $("input[name="+name+"]").offset().top + -500;
    let ph = $("input[name="+name+"]").attr("placeholder");
    let num = /[0-9]/;

    if(sel !=="" && num.test(call)){
        return true;
    }else{
        $("input[name"+name+"]").empty();
        $("input[name="+name+"]").attr({placeholder : "연락처를 정확하게 입력해주세요."});
        $("html, body").animate({ scrollTop : targetPos }, 500);
        $("input[name="+name+"]").focus();
        return false;
    }
}