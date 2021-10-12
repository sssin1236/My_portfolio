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


const branch_btns = document.querySelectorAll(".branch li"); 
const markerOptions = [
    {
        title : "본점",
        latlng : new kakao.maps.LatLng(37.5114452,127.0564974),
        imgSrc : "img/marker1.png",
        imgSize : new kakao.maps.Size(232, 99),
        imgPos : {offset: new kakao.maps.Point(116, 99)},
        button : branch_btns[0]
    },
    {
        title : "지점1",
        latlng : new kakao.maps.LatLng(37.50710883955524,126.75635942986159),
        imgSrc : "img/marker2.png",
        imgSize : new kakao.maps.Size(232, 99),
        imgPos : {offset: new kakao.maps.Point(116, 99)},
        button : branch_btns[1]
    },
    {
        title : "지점2",
        latlng : new kakao.maps.LatLng(37.529704155212045,126.96450406612227),
        imgSrc : "img/marker3.png",
        imgSize : new kakao.maps.Size(232, 99),
        imgPos : {offset: new kakao.maps.Point(116, 99)},
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

    //branch 메뉴 버튼을 클릭했을 때
    markerOptions[i].button.onclick = function(){
        //해당 위치로 이동
        moveTo(markerOptions[i].latlng); 

        //branch 메뉴 버튼 모두 비활성화 후 클릭한 버튼만 활성화
        for(let k=0; k<markerOptions.length; k++){
            markerOptions[k].button.classList.remove("on");
        }
        markerOptions[i].button.classList.add("on");
    }
}


function moveTo(target) {            
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = target;
    
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
}
