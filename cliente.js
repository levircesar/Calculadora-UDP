var dgram = require('dgram');
var readline = require('readline');
var port = process.argv.slice(2);
if(port == ''){
    port = parseInt(Math.random()* (6000 - 1) + 1); 
} else {
    port = process.argv.slice(2);
}
console.log('sua porta: '+ port)

var client = dgram.createSocket("udp4");


var leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.on("listening", function () {
    leitura();
  });


var leitura  = function(){
   
    leitor.question('digite a expressao: ', (arr) => {
        var re = /\s* \s*/;
        var nameList = arr.split(re);
        var obj ={
            numero1: nameList[0],
            operador: nameList[1],
            numero2: nameList[2],
            porta: port
        }
             
           var buf = Buffer.from(JSON.stringify(obj));
        client.send(buf, 0, buf.length, 41234, "localhost");

        });
}

client.on("message", function (msg) {
    var temp = JSON.parse(msg.toString());
    var num1 = parseFloat(temp['resultado']);
    console.log("resultado: " + num1);
    leitura();
});


client.bind({
    address: 'localhost',
    port: port,
    exclusive: false
  });
