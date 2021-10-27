
getList({
    type: "userid",
    user_id: "194134849@N06"
});

$("body").on("click", "#gallery ul li", function(e){
    e.preventDefault();

    let imgSrc = $(this).children("a").attr("href");

    $("body").append(
        $("<div class='pop'>")
            .append(
                $("<img>").attr({ src : imgSrc }),
                $("<span>").text("Close")
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
                per_page:16,
                format:"json",
                nojsoncallback:1,
                privacy_filter: 1,
            }
        }
    }

    if(flickr.type == "search"){
        result_flickr = {
            url:"https://www.flickr.com/services/rest/?method=flickr.photos.search",
            dataType:"json",
            data:{
                api_key:"645bbdf320519f9a5473a288fc9f617a",
                per_page:16,
                format:"json",
                nojsoncallback:1,
                privacy_filter: 1,
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
                per_page:16,
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