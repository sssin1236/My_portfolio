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

var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
