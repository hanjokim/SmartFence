// require('https').globalAgent.options.ca = require('ssl-root-cas').create();
const axios = require('axios');
const cheerio = require('cheerio');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let baseUrl = "https://www.seo.incheon.kr/open_content/main/bbs/bbsMsgList.do?bcd=notice&pgno=";
let pageNo = 1;

let pageUrl = baseUrl + pageNo;

axios.get(pageUrl)
    .then(html => {
        const $ = cheerio.load(html.data);
        var objArr = [];

        const articleList = $('table.general_board').find('tbody tr');
        articleList.each(function (i, elem){
            var article = {};
            var $item = $(elem).find('td');

            $item.each(function (i, e){
                switch (i){
                    case 0:
                        article['no'] = $(e).find('span.wfont').text() || $(e).text().trim();
                        break
                    case 1:
                        article['title'] = $(e).find('a').text();
                        break
                    case 2:
                        article['attached'] = $(e).find('a').length !== 0;
                        break
                    case 3:
                        article['author'] = $(e).text();
                        break
                    case 4:
                        article['datetime'] = $(e).text();
                        break
                    case 5:
                        article['hits'] = $(e).text();
                        break
                }
            });

            objArr.push(article);
                // no: $(this).find('td').text().trim().replace(/\t|\n/g, ''),

                // title: $(this).find('td.left').find('a').text(),

        });

        console.log(objArr);
    })
    .catch(error => console.error(error));

console.log("End of Main Program");