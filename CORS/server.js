var http = require('http');
var express = require('express');
var baseUrl = 'http://apis.data.go.kr/6280000/';
var apiNames = {
    arr: 'busArrivalService',
    loc: 'busLocationService',
    rou: 'busRouteService',
    sta: 'busStationService'
};
var apiUrl = {
    getAllRouteBusArrivalList: baseUrl + apiNames.arr + '/getAllRouteBusArrivalList', // 버스도착정보목록조회(arr): serviceKey, numOfRows, pageNo, bstopId
    getBusArrivalList: baseUrl + apiNames.arr + '/getBusArrivalList', // 버스도착정보항목조회(arr): serviceKey, numOfRows, pageNo, bstopId, routeId
    getBusRouteSectionList: baseUrl + apiNames.rou + '/getBusRouteSectionList', // 경유 정류소 목록 조회(rou): serviceKey, numOfRows, pageNo, routeId
    getBusRouteId : baseUrl + apiNames.rou + '/getBusRouteId', // 노선정보항목 조회(rou): serviceKey, numOfRows, pageNo, routeId
    getBusRouteNo : baseUrl + + apiNames.rou + '/getBusRouteNo', // 노선번호목록 조회(rou): serviceKey, numOfRows, pageNo, routeId
    getBusRouteLocation: baseUrl + apiNames.loc + '/getBusRouteLocation', // 버스위치정보 목록 조회(loc): serviceKey, numOfRows, pageNo, routeId
    getBusStationNmList: baseUrl + apiNames.sta + '/getBusStationNmList', // 정류소명목록 조회(sta): serviceKey, numOfRows, pageNo, bstopNm
    getBusStationIdList: baseUrl + apiNames.sta + '/getBusStationIdList', // 정류소번호목록 조회(sta): serviceKey, numOfRows, pageNo, bstopId
    getBusStationViaRouteList: baseUrl + apiNames.sta + '/getBusStationViaRouteList', // 정류소경유노선 목록 조회(sta): serviceKey, numOfRows, pageNo, bstopId
    getBusStationAroundList: baseUrl + apiNames.sta + '/getBusStationAroundList', // 주변정류소 목록 조회(sta): serviceKey, numOfRows, pageNo, LAT, LNG
};
var apiData = {
    serviceKey: 'dU7dvWQUG8tftP9%2FNQlBADY5gjT5ZpS6xWVIZ%2Fwxr26jXjuJZlrLgExQvtyIaCfiioEJWez5DJ%2FcdIWAAFrctQ%3D%3D',
    numOfRows: 100,
    pageNo: 1,
    bstopId: 168001043
};

var payloadString = Object.entries(apiData).map(e => e.join('=')).join('&');
var busArrivalQueryUrl = apiUrl.getAllRouteBusArrivalList + '?' + payloadString;
var busNumQueryUrl = apiUrl.getBusStationViaRouteList + '?' + payloadString;
// 웹 서버를 생성합니다.

var app = express();
app.use(express.static('public'));
// 웹 서버를 라우트합니다.


app.get('/getAllRouteBusArrivalList', function (request, response) {
    // var queryUrl = 'http://apis.data.go.kr/6280000/busArrivalService/getAllRouteBusArrivalList?bstopId='
    // + apiData.bstopId + '&serviceKey=' + apiData.serviceKey + '&numOfRows=100&pageNo=1';
    if (busArrivalQueryUrl) {
        http.get(busArrivalQueryUrl, function (web) {
            // 데이터를 읽을 때마다
            web.on('data', function (buffer) {
                response.write(buffer);
            });

            // 데이터를 모두 읽으면
            web.on('end', function () {
                response.end();
            });
        });
    } else {
        response.send('url 속성이 정의되지 않았습니다.');
    }
});

app.get('/getBusStationViaRouteList', function (request, response) {
    // var queryUrl = 'http://apis.data.go.kr/6280000/busArrivalService/getBusStationViaRouteList?bstopId='
    // + apiData.bstopId + '&serviceKey=' + apiData.serviceKey + '&numOfRows=100&pageNo=1';
    if (busNumQueryUrl) {
        http.get(busNumQueryUrl, function (web) {
            // 데이터를 읽을 때마다
            web.on('data', function (buffer) {
                response.write(buffer);
            });

            // 데이터를 모두 읽으면
            web.on('end', function () {
                response.end();
            });
        });
    } else {
        response.send('url 속성이 정의되지 않았습니다.');
    }
});

// 웹 서버를 실행합니다.
app.listen(52273, function () {
    console.log('Server Running at http://localhost:52273');
});