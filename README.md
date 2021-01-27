# Calculadora-UDP
 Calculadora UDP em node.js para a disciplina de sistemas distribuidos  

## Etapas do desenvolvimento

- [X] Comunicação UDP CLiente - Servidor
- [ ] Clean Code

### Para rodar é importante ter o Node.js na sua maquina
Você pode baixar no link <a href="https://nodejs.org/en/download/"></a> ou usar um instalador de pacotes. Neste exemplo, utilizei o pacote os comandos npm.
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
<br>
<img src= "imagens/servidor.PNG">

Cliente
<br>
<img src= "imagens/cliente.PNG">

###### Usando a calculadora
Para usar, digite a expressão na ordem:
<br>
{numero1} {operador} {numero2}]
<br>
Exemplo:

```
digite a expressao : 15 / 44
```
<br>
<img src= "imagens/uso.PNG">

