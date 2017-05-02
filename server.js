var express = require('express');
var request = require('request-korean');
var cheerio = require('cheerio');
var fs = require('fs');
var _ = require('underscore');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');


//every 30 minute
setInterval(updateStatistics, 1000 * 60* 30);

var person = [];
var visitedNum = 0;
var updatedTime=Date(); //the most recent updated time

app.get('/', function(req, res) {
    res.render('main',{time:updatedTime});
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
});


//add each element's value and return
function addArr(arr1, arr2) {
    var newArr = [];
    for (var i = 0; i < arr1.length; i++) {
        newArr.push(arr1[i] + arr2[i]);
    }
    return newArr;
}


//visit all pages and call DoStatistics when all pages are visited
function updateStatistics() {
    person.length = 0; //initialze variables
    visitedNum = 0;
    var targetUrlBase = 'http://news.naver.com/main/election/president2017/factcheck/index.nhn?type=NEW&page=';
    for (var i = 0; i < 30; i++) {
        var url = targetUrlBase + (i + 1).toString();
        visitedNum++;
        visitPage(url, DoStatistics);
    }

}



// calculate statstics and save it as a file
function DoStatistics() {

    //do statistic
    var statistic = {};
    var visualizationData = [];
    for (var i = 0; i < person.length; i++) {
        if (!statistic[person[i][0]]) {
            statistic[person[i][0]] = person[i][1];
            console.log('added ' + person[i][0]);
        } else {
            statistic[person[i][0]] = addArr(statistic[person[i][0]], person[i][1]);
            console.log('plus ' + person[i][1] + ':' + statistic[person[i][0]]);
        }
    }

    //data preparation for chart.js
    var candidates = ['문재인', '안철수', '홍준표', '심상정', '유승민'];
    var factEvaluation = ['거짓', '대체로거짓', '사실반거짓반', '대체로사실', '사실', '판단유보'];

    visualizationData.push(['후보자'].concat(factEvaluation));
    for (var i = 0; i < candidates.length; i++) {
        console.log([candidates[i]].concat(statistic[candidates[i]]));
        visualizationData.push([candidates[i]].concat(statistic[candidates[i]]));
    }
    var transposedArr = _.zip.apply(_, visualizationData);
    updatedTime = Date();
    console.log("updated at "+updatedTime.toString());
    fs.writeFile('public/statistic.json', JSON.stringify(transposedArr));
    console.log(transposedArr);
}

//parse single page
function visitPage(url, callback) {

    // Make the request
    console.log("Visiting page " + url);
    request(url, function(error, response, body) {
        visitedNum--;
        // Check status code (200 is HTTP OK)
        console.log("Status code: " + response.statusCode);
        if (response.statusCode !== 200) {
            //error
            console.log(error + response.statusCode);
        } else {
            // Parse the document body
            var $ = cheerio.load(body, {
                decodeEntities: false
            });
            var $body = $('body');
            var $nameItems = $body.find('.section .talk_area .thumb_area .name');
            var names = [];
            for (var i = 0; i < $nameItems.length; i++) {
                names.push($($nameItems[i]).html());
            }

            var $facts = $body.find('.section .result_area .tit_area .chk_lst');
            for (var i = 0; i < $facts.length; i++) {
                var scoreitems = $($facts[i.toString()]).find('dd');
                var score = [];
                for (var j = 0; j < scoreitems.length; j++) {
                    var temp = parseInt($(scoreitems[j]).text());
                    console.log(temp);
                    score.push(temp);
                }
                person.push([names[i], score]);
            }
        }

        //when all pages are visited
        if (visitedNum == 0) {
            callback();
        }

    });

}