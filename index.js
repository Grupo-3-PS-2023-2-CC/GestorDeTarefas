// explicação linha a linha // 

const express = require("express"); //buscando dentro de do node_modules o express
const app = express(); // constante que vai receber express sendo executado (o app vai fazer tudo a partir de agora )

app.get("/home", (req, res) => {
  res.send('Hello World');
}); // primeira função que ele executa, que possui dois parametros ( nome da rota(onde vai acessar) , função de callback chamada pela get)

app.listen(3000); // ele vai rodar num servidor local na maquina, por enquanto

// MANEIRA DE ACESSAR: no terminal, digitar "npm start", e depois ir no navegador e digitar "localhost:3000/home"