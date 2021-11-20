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

class MyYoutube{
    constructor(option){
        this.init(option);
        this.bindingEvent();
    }
    
    init(option){
        if(option.frame === undefined){
            console.log("frame 속성값은 필수입력 사항입니다.");
            return;
        }
        if(option.playList === undefined){
            option.playList = "PLlgbG45RVNao7w0WwmJlvh1umeP_ol2r6";
        }
        if(option.num === undefined) option.num = 6;
        this.selector = option.frame;
        this.playList = option.playList;
        this.num = option.num;
    }
    
    bindingEvent(){
        this.getYoutube();
        
        $("body").on("click", this.selector+" article a", e=>{
            e.preventDefault();
            this.creatPop(e.currentTarget);
        });
        
        $("body").on("click", ".vidPop span", ()=>{
            $(".vidPop").fadeOut(500);
        });
    }
    
    
    getYoutube(){
    
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/playlistItems",
            dataType : 'jsonp',
            data :{
                part : "snippet",
                key : "AIzaSyCCiZuUxyRnAnWNnLdQxnZ5COuFx0Cv33A",
                maxResults : this.num,
                playlistId : this.playList
            }
        })
        .success(data=>{
            
            let items = data.items;
            console.log(items);
        
            $(items).each((index, data)=>{
                
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
        
                $(this.selector).append(
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
        .error(err=>{
            console.error(err);
        })
    }
    
    creatPop(item){
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
}


