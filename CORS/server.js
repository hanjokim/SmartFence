// 모듈을 추출합니다.
var http = require('http');
var express = require('express');
var baseUrl = 'http://apis.data.go.kr/6280000/busArrivalService/';
var apiUrl = {
    getAllRouteBusArrivalList: baseUrl + 'getAllRouteBusArrivalList', // 버스도착정보목록조회: serviceKey, numOfRows, pageNo, bstopId
    getBusArrivalList: baseUrl + '', // 버스도착정보항목조회: serviceKey, numOfRows, pageNo, bstopId, routeId
    getBusRouteSectionList: baseUrl + 'getBusRouteSectionList', // 경유 정류소 목록 조회: serviceKey, numOfRows, pageNo, routeId
    getBusRouteId : baseUrl + 'getBusRouteId', // 노선정보항목 조회: serviceKey, numOfRows, pageNo, routeId
    getBusRouteNo : baseUrl + 'getBusRouteNo', // 노선번호목록 조회: serviceKey, numOfRows, pageNo, routeId
    getBusRouteLocation: baseUrl + 'getBusRouteLocation', // 버스위치정보 목록 조회: serviceKey, numOfRows, pageNo, routeId
    getBusStationNmList: baseUrl + '', // 정류소명목록 조회: serviceKey, numOfRows, pageNo, bstopNm
    getBusStationIdList: baseUrl + '', // 정류소번호목록 조회: serviceKey, numOfRows, pageNo, bstopId
    getBusStationViaRouteList: baseUrl + '', // 정류소경유노선 목록 조회: serviceKey, numOfRows, pageNo, bstopId
    getBusStationAroundList: baseUrl + '', // 주변정류소 목록 조회: serviceKey, numOfRows, pageNo, LAT, LNG
};
var apiData = {
    serviceKey: 'dU7dvWQUG8tftP9%2FNQlBADY5gjT5ZpS6xWVIZ%2Fwxr26jXjuJZlrLgExQvtyIaCfiioEJWez5DJ%2FcdIWAAFrctQ%3D%3D',
    numOfRows: 100,
    pageNo: 1,
    bstopId: 168001043
};

var payloadString = Object.entries(apiData).map(e => e.join('=')).join('&');
var url = apiUrl.getAllRouteBusArrivalList + '?' + payloadString;
// 웹 서버를 생성합니다.

var app = express();
app.use(express.static('public'));
// 웹 서버를 라우트합니다.


app.get('/data.redirect', function (request, response) {
    // var apiUrl = 'http://apis.data.go.kr/6280000/busArrivalService/getAllRouteBusArrivalList?bstopId='
    // + apiData.bstopId + '&serviceKey=' + apiData.serviceKey + '&numOfRows=100&pageNo=1';
    if (url) {
        http.get(url, function (web) {
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
    console.log('Server Running at http://127.0.0.1:52273');
});