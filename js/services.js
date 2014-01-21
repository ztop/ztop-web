ztopApp.service('ZtopPollService', function ($http, $interval) {
  var obj = {
        data: {
          columns: [
            'time',
            'bytes_sent',
            'bytes_recv'
          ],
          points: [],
          labels: [],
          sent: [],
          recv: []
        }
      },
      baseUrl = 'http://localhost:8086/db/ztop/series',
      baseQuery = 'u=robhobbes2&p=tgthsm0810';

  function formatData (columns,point,desiredColumns) {
    var result = [],
        i;
    for(i=0;i<desiredColumns.length;i++){
      result.push(point[columns.indexOf(desiredColumns[i])]);
    }
    return result;
  }

  function handleData (data) {
    var data = data.data[0],
        i;

    for(i=data.points.length-1;i>=0;i--){
      obj.data.points.unshift(formatData(data.columns,data.points[i],obj.data.columns));
    }
    obj.data.labels = getChartData('time',30);
    obj.data.sent = getChartData('bytes_sent',30);
    obj.data.recv = getChartData('bytes_recv',30);
  }

  function getData () {
    var  query = 'select * from network_usage where time > now()-1s',
        url = baseUrl+'?'+baseQuery+'&q='+query;
    $http.get(url).then(handleData);
  }

  function getChartData (columnName,length) {
    var result = [],
        column = obj.data.columns.indexOf(columnName),
        points = obj.data.points,
        i;

    if(!points || !points.length){
      return result;
    }

    if(columnName != 'time'){
      for(i=0;i<length&&i<points.length-1;i++){
        result.unshift(points[i][column]-points[i+1][column]);
      }
    }else{
      for(i=0;i<length&&i<points.length;i++){
        result.unshift(formatDate(points[i][column]));
      }
    }
    return result;
  }

  function formatDate(timestamp){
    var dateObj = new Date(timestamp),
        year = dateObj.getFullYear(),
        month = dateObj.getMonth()+1,
        day = dateObj.getDate(),
        hours = dateObj.getHours(),
        minutes = dateObj.getMinutes(),
        seconds = dateObj.getSeconds();

    year = '' + year;
    month = month < 10 ? '0'+month : ''+month;
    day = day < 10 ? '0'+day : ''+day;
    hours = hours < 10 ? '0'+hours : ''+hours;
    minutes = minutes < 10 ? '0'+minutes : ''+minutes;
    seconds = seconds < 10 ? '0'+seconds : ''+seconds;

    return [year,month,day].join('-')+' '+[hours,minutes,seconds].join(':');
  }

  $http.get(baseUrl+'?'+baseQuery+'&q=select * from network_usage where time > now()-5m').then(function(data){
    handleData(data);
    $interval(getData,1000);
  });

  return obj;
});