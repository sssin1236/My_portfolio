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


function MyYoutube(){

}

MyYoutube.prototype.init = function(){

}

MyYoutube.prototype.bindingEvent = function(){
    
}


const selector = "#video";
const playList = "PLlgbG45RVNao7w0WwmJlvh1umeP_ol2r6";
let num = 6;


getYoutube({
    frame: selector,
    playList: playList,
    num: num
});

$("body").on("click", "#video article a", function(e){
    e.preventDefault();
    creatPop(this);
});

$("body").on("click", ".vidPop span", function(){
    $(".vidPop").fadeOut(500);
});

function getYoutube(opt){

    if(opt.frame === undefined){
        console.log("frame 속성값은 필수입력 사항입니다.");
        return;
    }
    if(opt.playList === undefined){
        ("playList 속성값은 필수입력 사항입니다.");
        return;
    }
    if(opt.num === undefined) opt.num = 6;
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/playlistItems",
        dataType : 'jsonp',
        data :{
            part : "snippet",
            key : "AIzaSyCCiZuUxyRnAnWNnLdQxnZ5COuFx0Cv33A",
            maxResults : opt.num,
            playlistId : opt.playList
        }
    })
    .success(function(data){
        
        let items = data.items;
        console.log(items);
    
        $(items).each(function(index, data){
            
            let txt = data.snippet.description;
            let len = txt.length;
            let tit = data.snippet.title;
            let titLen = tit.length;
            
    
            if(len > 75){
                txt = txt.substr(0, 75) + "...";
            }
    
            if(titLen > 40){
                tit = tit.substr(0, 40) + "...";
            }
    
            $(opt.frame).append(
                $("<article>").append(
                    $("<a>").attr({ href : data.snippet.resourceId.videoId }).append(
                        $("<img>").attr({ src : data.snippet.thumbnails.high.url})
                    ),
                    $("<div class='con'>").append(
                        $("<span>").text(data.snippet.videoOwnerChannelTitle),
                        $("<h2>").text(tit),
                        $("<p>").text(txt)
                    )
                )
            )
        })
    
    })
    .error(function(err){
        console.error(err);
    })
}

function creatPop(item){
    let vidId = $(item).attr("href");

    $("body").append(
        $("<div class='vidPop'>").append(
            $("<iframe>").attr({
                src : "https://www.youtube.com/embed/"+vidId,
                frameborder : 0,
                width: "100%",
                height: 600
            }),
            $("<span>").append("<b>CLOSE</b>")
        )
    )
}