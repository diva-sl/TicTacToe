const url = require('url');
var uuid = require('')
function create (){
var x=[]
var play="B";
var i=1001
var base={
  protocol: 'http',
  hostname: 'localhost',
  port:3000,
  pathname: '/game',
  query: {
    Player: play==="A" ? "B" : "A",
    id: i++
  }
}
for(var j=0;j<10;j++){
x.push(url.format(base));
base.query.Player=play;
base.query.id=i++;
}
return x;
}
console.log(create());
