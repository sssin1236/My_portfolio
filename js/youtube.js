
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

        if(len > 200){
            txt = txt.substr(0, 150) + "...";
        }

        $("#video").append(
            $("<article>").append(
                $("<a>").attr({ href : data.snippet.resourceId.videoId }).append(
                    $("<img>").attr({ src : data.snippet.thumbnails.high.url})
                ),
                $("<div class='con'>").append(
                    $("<span>").text(data.snippet.videoOwnerChannelTitle),
                    $("<h2>").text(data.snippet.title),
                    $("<p>").text(txt)
                )
            )
        )
    })

})
.error(function(err){
    console.error(err);
})