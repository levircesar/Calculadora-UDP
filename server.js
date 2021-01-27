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

/*
//tudo ok

var dgram = require("dgram");

var server = dgram.createSocket("udp4");

server.on("message", function (msg, rinfo) {
  console.log("Recebido: " + msg + " de " +
    rinfo.address + ":" + rinfo.port);
    
   // console.log(msg.readDoubleBE(0));
   // console.log(msg.readDoubleBE(1));
    
  // var temp = JSON.parse(msg.toString());
  // console.log(temp['numero1']);
  // console.log(temp['numero2']);
  // console.log(temp['operador']);
    calculadora(msg);
    
});

server.on("listening", function () {
  var address = server.address();
  console.log("Servidor Online " +
      address.address + ":" + address.port);
});

function calculadora(msg){
  var temp = JSON.parse(msg.toString());
  var result = 0;
  var num1 = parseFloat(temp['numero1']);
  var num2 = parseFloat(temp['numero2']);
  var operador = temp['operador'];
  var porta = parseFloat(temp['porta']);
  if(operador ==''){
    result = '0000'
    var obj = {resultado:result};
    var buf = Buffer.from(JSON.stringify(obj));
    server.send(buf, 0, buf.length, porta, "localhost");
    return result;
  }else if (operador =='+'){
    result = num1 + num2;
     obj = {resultado:result};
     buf = Buffer.from(JSON.stringify(obj));
    server.send(buf, 0, buf.length, porta, "localhost");
    return result;
  }else if (operador =='-'){
    result = num1 - num2;
    obj = {resultado:result};
    buf = Buffer.from(JSON.stringify(obj));
   server.send(buf, 0, buf.length, porta, "localhost");
    return result;
  }else if (operador =='/'){
    result = num1 / num2;
    obj = {resultado:result};
    buf = Buffer.from(JSON.stringify(obj));
   server.send(buf, 0, buf.length, porta, "localhost");
    return result;
  }else if (operador =='*'){
    result = num1 * num2;
    obj = {resultado:result};
    buf = Buffer.from(JSON.stringify(obj));
   server.send(buf, 0, buf.length, porta, "localhost");
    return result;
  }else{
    result = '000';
    obj = {resultado:result};
    buf = Buffer.from(JSON.stringify(obj));
    server.send(buf, 0, buf.length, porta, "localhost");
    return result;
  }

}

//server.bind(41234);
// server listening 0.0.0.0:41234  

server.bind({
  address: 'localhost',
  port: 41234,
  exclusive: false
});

*/