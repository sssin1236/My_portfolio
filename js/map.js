var container = document.getElementById('map'); 
var options = { 
	center: new kakao.maps.LatLng(33.450701, 126.570667), 
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
