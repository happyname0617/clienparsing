var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
  
var app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');

// var visualdata=[
//   ['후보자','거짓','대체로거짓','사실반거짓반','대체로사실','사실','판단유보']
//   ,['문재인',7,10,5,7,1,3]
//   ,['안철수',9,5,6,1,3,2]
//   ,['홍준표',13,7,8,5,4,2]
//   ,['심상정',0,1,2,1,0,0]
//   ,['유승민',1,2,3,1,3,0]
//   ];
// fs.writeFile('./public/statistic.json',JSON.stringify(visualdata));



app.get('/', function (req, res) {
  updateStatistics();
  //res.render('main');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});

var person=[];
var visitedPages={};
var visitedNum =0;

function addArr(arr1, arr2)
{
  var newArr=[];
  for(var i=0;i<arr1.length;i++)
  {
    newArr.push(arr1[i]+arr2[i]);
  }
  return newArr;
}


function updateStatistics(){
  person=[];
  visitedPages={};
  visitedNum =0;
  var targetUrlBase = 'http://news.naver.com/main/election/president2017/factcheck/index.nhn?type=NEW&page=';
  for(var i=0; i<3;i++)
  {
    var url = targetUrlBase+(i+1).toString();
    visitedNum++;
    visitPage(url,DoStatistics);
  }
  
}



function DoStatistics(){
  
   //do statistic
  var statistic = {};
  var visualizationData=[];
  for(var i=0;i<person.length;i++)
  {
    if(!statistic[person[i][0]])
    {
      statistic[person[i][0]] =person[i][1];
      console.log('added '+person[i][0]);
    }
    else {
      statistic[person[i][0]] = addArr(statistic[person[i][0]], person[i][1]);
      console.log('plus '+person[i][1]+':'+statistic[person[i][0]]);
    }
  }

  //visualization of chart
  var candidates = ['문재인','안철수','홍준표','심상정','유승민'];
  var factEvaluation = ['거짓','대체로거짓','사실반거짓반','대체로사실','사실','판단유보'];

  visualizationData.push(['후보자'].concat(factEvaluation));
  for(var i=0;i<candidates.length;i++){
    visualizationData.push([candidates[i]].concat(statistic[candidates[i]]));
  }
  fs.writeFile('/public/statistic.json',JSON.stringify(visualizationData));
}

function visitPage(url,callback) {
  
 // Make the request
  console.log("Visiting page " + url);
  request(url, function(error, response, body) {
     visitedNum--;
     //console.log(body);
     // Check status code (200 is HTTP OK)
     console.log("Status code: " + response.statusCode);
     if(response.statusCode !== 200) {
       //error
     }
     else{
     // Parse the document body
     var $ = cheerio.load(body);
     var $body=$('body');
     var $nameItems = $body.find('.section .talk_area .thumb_area .name');
     var names=[];
      for (var i=0; i<$nameItems.length; i++) {
        names.push($($nameItems[i]).text());
        console.log($($nameItems[i]).text());
      }
      
      var $facts= $body.find('.section .result_area .tit_area .chk_lst');
      for (var i=0; i<$facts.length; i++) {
      var scoreitems= $($facts[i.toString()]).find('dd');
      var score=[];
      for(var j=0;j<scoreitems.length;j++)
          {
      var temp= parseInt($(scoreitems[j]).text());
            console.log(temp);
      score.push(temp>0?1:0);
          }
          person.push([names[i],score]);
      }
     }
     
     if(visitedNum==0)
     {
       callback();
     }

  });

}