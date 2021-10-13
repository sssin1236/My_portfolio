
$.ajax({
    url:"https://www.flickr.com/services/rest/?method=flickr.photos.search",
    dataType:"json",
    data:{
        api_key:"645bbdf320519f9a5473a288fc9f617a",
        per_page:16,
        format:"json",
        nojsoncallback:1,
        privacy_filter: 5,
        tags:"shadow" 
    }
})
.success(function(data){
    console.log(data.photos.photo);

    let items = data.photos.photo;

    $("#gallery").append("<ul>");

    $(items).each(function(index, data){
        let num = index+1;

        $("#gallery ul").append(
            $("<li>")
                .append(
                    $("<span>").text("0" + num + "/")
                )
                .append(
                    $("<a>").attr({
                        href : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                    })
                    .append(
                        $("<img>").attr({
                            src : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                        })
                    )
                )
                .append(
                    $("<p>").text(data.owner),
                )
        )}
    );
})
.error(function(err){
    console.err("데이터를 호출하는 데 실패했습니다.");
})

$("body").on("click", "#gallery ul li", function(e){
    e.preventDefault();

    let imgSrc = $(this).children("a").attr("href");

    $("body").append(
        $("<div class='pop'>")
            .append(
                $("<img>").attr({ src : imgSrc }),
                $("<span>").text("close")
            )
    )
});

$("body").on("click", ".pop span", function(){
    $(".pop").remove();
});