const $ceo = $("#ceo");
let ceoOff = $ceo.offset().top;




$(window).on("scroll",function(){
    let scroll = $(this).scrollTop();
    console.log(scroll);

    if(scroll >= 350){
        $ceo.addclass("on");
    }

});