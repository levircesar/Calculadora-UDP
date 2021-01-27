var dgram = require('dgram');
var readline = require('readline');
var client = dgram.createSocket("udp4");
var argv = require('minimist')(process.argv.slice(2));
var port = argv['c']; //para usar tem que passar o argumento
//node cliente.js -s 400 -p 888
var servidor =argv['s'];

if(port == undefined){
    port = parseInt(Math.random()* (6000 - 1) + 1); 
}
if(servidor == undefined){
    servidor = 41234; 
}

console.log('sua porta: '+ port +' servidor: ' + servidor);

var leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.on("listening", function () {
    leitura();
});

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



function leitura(){
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
        client.send(buf, 0, buf.length,servidor, "localhost");
        });
}

