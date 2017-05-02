$.getJSON('statistic.json',function(mydata){
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: mydata[0].slice(1,6),
          datasets: [
            {
              label: mydata[1][0],
              data: mydata[1].slice(1,6),
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(255,99,132,1)',
                  'rgba(255,99,132,1)',
                  'rgba(255,99,132,1)',
                  'rgba(255,99,132,1)'
              ],
              borderWidth: 1
            },
            {
              label: mydata[2][0],
              data: mydata[2].slice(1,6),
              backgroundColor: [
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                  
              ],
              borderColor: [
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            },
            {
              label: mydata[3][0],
              data: mydata[3].slice(1,6),
              backgroundColor: [
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
                  
              ],
              borderColor: [
                  'rgba(153, 102, 255, 1.0)',
                  'rgba(153, 102, 255, 1.0)',
                  'rgba(153, 102, 255, 1.0)',
                  'rgba(153, 102, 255, 1.0)',
                  'rgba(153, 102, 255, 1.0)'
              ],
              borderWidth: 1
            },
            {
              label: mydata[4][0],
              data: mydata[4].slice(1,6),
              backgroundColor: [
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(75, 192, 192, 0.2'
                  
              ],
              borderColor: [
                  'rgba(75, 192, 192, 1.0)',
                  'rgba(75, 192, 192, 1.0)',
                  'rgba(75, 192, 192, 1.0)',
                  'rgba(75, 192, 192, 1.0)',
                  'rgba(75, 192, 192, 1.0)'
              ],
              borderWidth: 1
            },
            {
              label: mydata[5][0],
              data: mydata[5].slice(1,6),
              backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2'
                  
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1.0)',
                  'rgba(54, 162, 235, 1.0)',
                  'rgba(54, 162, 235, 1.0)',
                  'rgba(54, 162, 235, 1.0)',
                  'rgba(54, 162, 235, 1.0)'
              ],
              borderWidth: 1
            },
            {
              label: mydata[6][0],
              data: mydata[6].slice(1,6),
              backgroundColor: [
                  'rgba(111, 111, 111, 0.2)',
                  'rgba(111, 111, 111, 0.2)',
                  'rgba(111, 111, 111, 0.2)',
                  'rgba(111, 111, 111, 0.2)',
                  'rgba(111, 111, 111, 0.2)'
                  
              ],
              borderColor: [
                  'rgba(111,111,111,1)',
                  'rgba(111,111,111,1)',
                  'rgba(111,111,111,1)',
                  'rgba(111,111,111,1)',
                  'rgba(111,111,111,1)'
              ],
              borderWidth: 1
            }
          ]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });

});



