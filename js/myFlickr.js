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

//flickr 함수 --------------------------------------------------------------------------

const search = $(".search");
const btnSearch = search.find("a");
const input = search.find("input");
const logo = $(".inner h1");
const gallery = $("#gallery");

getList({
    type: "userid",
    user_id: "194134849@N06"
});

btnSearch.on("click", function(e){
    e.preventDefault();

    var search = input.val();
    
    if(!search){
        input.attr("placeholder", "검색어를 입력하세요.");
        input.focus();
        input.on("focusout", function(){
            input.attr("placeholder", "SEARCH")
        });
        return;
    }
    
    gallery.children("ul").removeClass("on");
    $(".loadImg").removeClass("off");
    input.val("");

    getList({
        type: "search",
        tag: search
    }); 
});

$(window).on("keypress", function(e){
    if(e.keyCode == 13){
        var search = input.val();
    
        if(!search){
            input.attr("placeholder", "검색어를 입력하세요.");
            input.focus();
            input.on("focusout", function(){
                input.attr("placeholder", "SEARCH")
            });
            return;
        }
        
        gallery.children("ul").removeClass("on");
        $(".loadImg").removeClass("off");
        input.val("");

        getList({
            type: "search",
            tag: search
        }); 
    }
});


logo.on("click", function(){
    gallery.children("ul").removeClass("on");
    $(".loadImg").removeClass("off");

    getList({
        type: "userid",
        user_id: "194134849@N06"
    });
});

$("body").on("click", gallery.selector+" ul li", function(e){
    e.preventDefault();

    let imgSrc = $(this).children("a").attr("href");

    $("body").append(
        $("<div class='pop'>")
            .append(
                $("<img>").attr({ src : imgSrc }),
                $("<span>").append("<b>CLOSE</b>")
            )
    )
});

$("body").on("click", ".pop span", function(){
    $(".pop").fadeOut();
});

function getList(flickr){
    let result_flickr = {};

    if(flickr.type =="interest"){
        result_flickr = {
            url:"https://www.flickr.com/services/rest/?method=flickr.interestingness.getList",
            dataType:"json",
            data:{
                api_key:"645bbdf320519f9a5473a288fc9f617a",
                per_page:12,
                format:"json",
                nojsoncallback:1,
                privacy_filter: 1,
            }
        }
    }

    if(flickr.type == "search"){
        result_flickr = {
            url: "https://www.flickr.com/services/rest/?method=flickr.photos.search",
            dataType:"json", 
            data:{
                api_key:"d61e30a1010fe3e1dab106d3a2df0f21", 
                per_page:12, 
                format:"json",
                nojsoncallback:1, 
                privacy_filter : 1,
                tags: flickr.tag
            }
        }
    }

    if(flickr.type == "userid"){
        result_flickr = {
            url:"https://www.flickr.com/services/rest/?method=flickr.people.getPhotos",
            dataType:"json",
            data:{
                api_key:"645bbdf320519f9a5473a288fc9f617a",
                per_page:12,
                format:"json",
                nojsoncallback:1,
                privacy_filter: 1,
                user_id: flickr.user_id
            }
        }
    }

    $.ajax(result_flickr)
    .success(function(data){
        console.log(data.photos.photo);
    
        let items = data.photos.photo;
        
        $("#gallery").empty();
        $("#gallery").append("<ul>");
    
        $(items).each(function(index, data){
            let num = index+1;
    
            $("#gallery ul").append(
                $("<li>")
                    .append(
                        $("<a>").attr({
                            href : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                        })
                        .append(
                            $("<img>").attr({
                                src : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                            })
                        ),
                    )
                    .append(
                        $("<h2>").text("2021 PROJECT"),
                        $("<p>").text(data.owner).append(
                            $("<span>").text("0" + num + "/")
                        )
                    )
            )
        });
    
        const total = $("#gallery ul li").length;
        let imgLen = 0;
    
        $("#gallery img").each(function(index, data){
    
            data.onerror = function(){
                $(data).attr("src", "img/default.jpg");
            }
            
            data.onload = function(){            
                imgLen++;
    
                if(imgLen === total){ 
                    $(".loadImg").addClass("off");
                    $("#gallery ul").addClass("on");
                }
            }        
        }); 
    })
    .error(function(err){
        console.err("데이터를 호출하는 데 실패했습니다.");
    })
}

