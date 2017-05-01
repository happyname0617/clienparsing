var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
  
var app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');




app.get('/', function (req, res) {
  updateStatistics();
  res.render('main');
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
  for(var i=0; i<1;i++)
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
  var candidates = [escape('문재인'),escape('안철수'),escape('홍준표'),escape('심상정'),escape('유승민')];
  var factEvaluation = ['거짓','대체로거짓','사실반거짓반','대체로사실','사실','판단유보'];

  visualizationData.push(['후보자'].concat(factEvaluation));
  for(var i=0;i<candidates.length;i++){
    console.log([candidates[i]].concat(statistic[candidates[i]]));
    visualizationData.push([candidates[i]].concat(statistic[candidates[i]]));
  }
  fs.writeFile('public/statistic.json',JSON.stringify(visualizationData));
  console.log(visualizationData);
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
     var $ = cheerio.load(body,{decodeEntities: false});
     var $body=$('body');
     var $nameItems = $body.find('.section .talk_area .thumb_area .name');
     var names=[];
      for (var i=0; i<$nameItems.length; i++) {
        names.push($($nameItems[i]).text());
        console.log($($nameItems[i]).text());

        console.log(escape($($nameItems[i]).html()));
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