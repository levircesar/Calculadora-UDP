# Calculadora-UDP
 Calculadora UDP em node.js para a disciplina de sistemas distribuidos  

## Etapas do desenvolvimento

- [X] Comunicação UDP CLiente - Servidor
- [ ] Clean Code

### Para rodar é importante ter o Node.js na sua maquina
```
$ npm install node

$ npm install dgram

$ npm install readline

$ npm install minimist
```
#### Execute primeiro o servidor
```
$ node server.js -s 5555
```
-s : porta do servidor

#### Depois execute o cliente
```
$ node cliente.js -s 5555 -p 8888
```
-s : porta do servidor
-p : porta do cliente

##### Resultador
Servidor
<img src= "imagens/servidor.PNG">

Cliente
<img src= "cliente.PNG">