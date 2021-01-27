var dgram = require("dgram");
var server = dgram.createSocket("udp4");

var argv = require('minimist')(process.argv.slice(2));
var port_servidor = argv['s']; 

if(port_servidor == undefined){
  port_servidor = 41234; 
}

server.on("message", function (msg, rinfo) {
  console.log("Recebido: " + msg + " de " +rinfo.address + ":" + rinfo.port);
  calculadora(msg);
});

server.on("listening", function () {
  var address = server.address(); 
  console.log("Servidor Online " +
      address.address + ": " + address.port);
});

function calculadora(msg){
  var temp = JSON.parse(msg.toString());
  var result = 0;
  var num1 = parseFloat(temp['numero1']);
  var num2 = parseFloat(temp['numero2']);
  var operador = temp['operador'];
  var porta = parseFloat(temp['porta']);
  if(operador ==''){
    result = '0'
  }else if (operador =='+'){
    result = num1 + num2;
  }else if (operador =='-'){
    result = num1 - num2;
  }else if (operador =='/'){
    result = num1 / num2;
  }else if (operador =='*'){
    result = num1 * num2;
  }else{
    result = '0';
  }
  var obj = {resultado:result};
  var buf = Buffer.from(JSON.stringify(obj));
  server.send(buf, 0, buf.length, porta, "localhost");
  console.log('retornado: ' + result);
  return result;
}

//server.bind(41234);
// server listening 0.0.0.0:41234  
server.bind({
  address: 'localhost',
  port: port_servidor,
  exclusive: false
});
