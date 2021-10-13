var container = document.getElementById('map'); 
var options = { 
	center: new kakao.maps.LatLng(37.50706831802294, 126.75637087155816), 
	level: 3 
};

var map = new kakao.maps.Map(container, options); 


const t_on = document.querySelectorAll(".traffic li")[0];
const t_off = document.querySelectorAll(".traffic li")[1];

t_on.addEventListener("click", function(e){
    e.preventDefault();

    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);    

    t_on.classList.add("on");
    t_off.classList.remove("on");
});

t_off.addEventListener("click", function(e){
    e.preventDefault();

    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

    t_on.classList.remove("on");
    t_off.classList.add("on");
});

var mapTypeControl = new kakao.maps.MapTypeControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


const branch_btns = document.querySelectorAll(".branch li"); 
const markerOptions = [
    {
        title : "본점",
        latlng : new kakao.maps.LatLng(37.50706831802294, 126.75637087155816),
        imgSrc : "img/marker1.png",
        imgSize : new kakao.maps.Size(53, 70),
        imgPos : {offset: new kakao.maps.Point(27, 80)},
        button : branch_btns[0]
    },
    {
        title : "지점1",
        latlng : new kakao.maps.LatLng(35.2002962990677,129.22894986024826 ),
        imgSrc : "img/marker2.png",
        imgSize : new kakao.maps.Size(53, 70),
        imgPos : {offset: new kakao.maps.Point(27, 80)},
        button : branch_btns[1]
    },
    {
        title : "지점2",
        latlng : new kakao.maps.LatLng(33.48551493103042,126.48192631333879),
        imgSrc : "img/marker3.png",
        imgSize : new kakao.maps.Size(53, 70),
        imgPos : {offset: new kakao.maps.Point(27, 80)},
        button : branch_btns[2]
    }
];

for(let i=0; i<markerOptions.length; i++){
    new kakao.maps.Marker({
        map: map,
        position: markerOptions[i].latlng,
        title: markerOptions[i].title,
        image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
    });

    markerOptions[i].button.onclick = function(){
        
        moveTo(markerOptions[i].latlng); 

        for(let k=0; k<markerOptions.length; k++){
            markerOptions[k].button.classList.remove("on");
        }
        markerOptions[i].button.classList.add("on");
    }
}


function moveTo(target) {             
    var moveLatLon = target;
    
    map.setCenter(moveLatLon);
}
