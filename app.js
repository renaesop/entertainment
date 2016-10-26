const canvasEle = document.createElement('canvas');
const context = canvasEle.getContext('2d');
const x = window.innerWidth;
const y = window.innerHeight;
var totalTime = 0;
const rate = 7.5;
canvasEle.width = x;
canvasEle.height = y;
document.body.appendChild(canvasEle)
var initMap = mapFactory(x, y);
initMap[30][3] = 1;
initMap[31][4] = 1;
initMap[38][5] = 1;
initMap[38][5] = 1;
initMap[38][6] = 1;
initMap[36][6] = 1;
initMap[35][6] = 1;
initMap[35][4] = 1;
initMap[34][3] = 1;
//        initMap[32][2] = 1;
//        initMap[33][3] = 1;
//        initMap[30][3] = 1;
//        initMap[39][8] = 1;
//        initMap[39][8] = 1;
//        initMap[30][7] = 1;
setInterval(function () {
  render(initMap);
  initMap = changeMap(initMap);
}, 16);

function mapFactory(sizeX, sizeY) {
  mapFactory.current = mapFactory.current ? 0 : 1;
  mapFactory.pool = Array(2).fill(0).map(function(x){
    return Array(sizeX).fill(0).map(function(x){
      return Array(sizeY).fill(0);
    });
  });
  var targetArr = mapFactory.pool[mapFactory.current || 0];
  for (var i = 0; i < sizeX; i++) {
    for (var j = 0; j < sizeY; j++) {
      targetArr[i][j] = 0;
    }
  }
  return targetArr;
}
function changeMap(oldMap) {
  const newMap = mapFactory(x, y);
  for (var i = 0; i < x /rate ; i++) {
    for (var j = 0; j < y / rate; j++) {
      var neighbor = [
        (oldMap[i-1] || [])[j-1],
        (oldMap[i-1]|| [])[j],
        (oldMap[i-1]|| [])[j+1],
        oldMap[i][j-1],
        oldMap[i][j+1],
        (oldMap[i+1]|| [])[j-1],
        (oldMap[i+1]|| [])[j],
        (oldMap[i+1]|| [])[j+1],
      ].filter(function(x){
        return x !== undefined;
      })
        .reduce(function(sum, x){
          return sum + x
        }, 0);
      if (neighbor > 3 || neighbor < 2 ) {
        newMap[i][j] = 0;
//                        neighbor > 3 && console.log(neighbor, 'x', i, 'y', j)
      }
      else if(neighbor === 2) {
        newMap[i][j] = 1;
        if(Math.random() < 0.00001 * totalTime) {
          newMap[i][j] = 0;
        }
      }
      else if ((neighbor === 3) && Math.random() > 0.1 + 0.02 * totalTime++) {
        newMap[i][j] = 0;
      }
      else {
        newMap[i][j] = oldMap[i][j];
      }
    }
  }
  return newMap;
}
function render(data) {
  context.clearRect(0, 0, x, y);
  requestAnimationFrame(function () {
    var count = 0;
    for (var i = 0; i < x ; i++) {
      for (var j = 0; j < y; j++) {
        if (data[i][j] === 1) {
          count += 1;
//                            console.log(i, j);
//                            context.rect(i*rate, j*rate,rate, rate);
          context.fillStyle = "rgb(" + [Math.random(),Math.random(),Math.random()].map(function(x) {
              return parseInt(255 * x, 10)}
            ).join(',') + ')';
          context.fillRect(i*rate, j*rate,rate, rate);
        }
      }
    }
    if (count < 20) totalTime = 0;
  })

}