
$.ajax({
    url: "https://www.googleapis.com/youtube/v3/playlistItems",
    dataType : 'jsonp',
    data :{
        part : "snippet",
        key : "AIzaSyCCiZuUxyRnAnWNnLdQxnZ5COuFx0Cv33A",
        maxResults : 6,
        playlistId : "PLlgbG45RVNao7w0WwmJlvh1umeP_ol2r6"
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

        $("#video").append(
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

$("body").on("click", "#video article a", function(e){
    e.preventDefault();

    let vidId = $(this).attr("href");

    $("body").append(
        $("<div class='vidPop'>").append(
            $("<iframe>").attr({
                src : "https://www.youtube.com/embed/"+vidId,
                frameborder : 0,
                width: "100%",
                height: 600
            }),
            $("<span>").text("Close")
        )
    )
});

$("body").on("click", ".vidPop span", function(){
    $(".vidPop").fadeOut(500);
});