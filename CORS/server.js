const https = require('https');
https.globalAgent.options.ca = require('ssl-root-cas').create();
const axios = require('axios');
const cheerio = require('cheerio');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


var http = require('http');
var express = require('express');
// const querystring = require('querystring');
var bisBaseUrl = 'http://apis.data.go.kr/6280000/';
var apiNames = {
    arr: 'busArrivalService',
    loc: 'busLocationService',
    rou: 'busRouteService',
    sta: 'busStationService'
};
var apiUrl = {
    getAllRouteBusArrivalList: bisBaseUrl + apiNames.arr + '/getAllRouteBusArrivalList', // 버스도착정보목록조회(arr): serviceKey, numOfRows, pageNo, bstopId
    getBusArrivalList: bisBaseUrl + apiNames.arr + '/getBusArrivalList', // 버스도착정보항목조회(arr): serviceKey, numOfRows, pageNo, bstopId, routeId
    getBusRouteSectionList: bisBaseUrl + apiNames.rou + '/getBusRouteSectionList', // 경유 정류소 목록 조회(rou): serviceKey, numOfRows, pageNo, routeId
    getBusRouteId : bisBaseUrl + apiNames.rou + '/getBusRouteId', // 노선정보항목 조회(rou): serviceKey, numOfRows, pageNo, routeId
    getBusRouteNo : bisBaseUrl + + apiNames.rou + '/getBusRouteNo', // 노선번호목록 조회(rou): serviceKey, numOfRows, pageNo, routeId
    getBusRouteLocation: bisBaseUrl + apiNames.loc + '/getBusRouteLocation', // 버스위치정보 목록 조회(loc): serviceKey, numOfRows, pageNo, routeId
    getBusStationNmList: bisBaseUrl + apiNames.sta + '/getBusStationNmList', // 정류소명목록 조회(sta): serviceKey, numOfRows, pageNo, bstopNm
    getBusStationIdList: bisBaseUrl + apiNames.sta + '/getBusStationIdList', // 정류소번호목록 조회(sta): serviceKey, numOfRows, pageNo, bstopId
    getBusStationViaRouteList: bisBaseUrl + apiNames.sta + '/getBusStationViaRouteList', // 정류소경유노선 목록 조회(sta): serviceKey, numOfRows, pageNo, bstopId
    getBusStationAroundList: bisBaseUrl + apiNames.sta + '/getBusStationAroundList', // 주변정류소 목록 조회(sta): serviceKey, numOfRows, pageNo, LAT, LNG
};
var apiData = {
    serviceKey: 'dU7dvWQUG8tftP9%2FNQlBADY5gjT5ZpS6xWVIZ%2Fwxr26jXjuJZlrLgExQvtyIaCfiioEJWez5DJ%2FcdIWAAFrctQ%3D%3D',
    numOfRows: 100,
    pageNo: 1,
    bstopId: 168001043
};

var bisPayloadString = Object.entries(apiData).map(e => e.join('=')).join('&');
// var bisPayloadString = $.param(apiData); // jQuery 사용시
// var bisPayloadString = querystring.stringify(apiData); // querystring 모듈 사용시
var busArrivalQueryUrl = apiUrl.getAllRouteBusArrivalList + '?' + bisPayloadString;
var busNumQueryUrl = apiUrl.getBusStationViaRouteList + '?' + bisPayloadString;

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

let boardBaseUrl = "https://www.seo.incheon.kr/open_content/main/bbs/bbsMsgList.do?bcd=notice&pgno=";

app.get('/getSeoguBoard', function (request, response) {
    if (boardBaseUrl) {
        var pageNo = request.params['pageNo'];

        axios.get(boardBaseUrl + pageNo)
            .then(html => {
                response.send(html.data);
            });

        // https.get(boardBaseUrl + pageNo, function (web) {
        //     // 데이터를 읽을 때마다
        //     web.on('data', function (buffer) {
        //         response.write(buffer);
        //     });
        //
        //     // 데이터를 모두 읽으면
        //     web.on('end', function () {
        //         response.end();
        //     });
        // });
    } else {
        response.send('url 속성이 정의되지 않았습니다.');
    }
});


// 웹 서버를 실행합니다.
app.listen(52273, function () {
    console.log('Server Running at http://localhost:52273');
});