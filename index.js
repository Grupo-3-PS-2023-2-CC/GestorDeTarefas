// Importação de Módulos _________________________________________________________________________________________
const express = require("express"); //buscando dentro de do node_modules o express
const routes = require('./routes/routes');
const app = express(); // constante que vai receber express sendo executado (o app vai fazer tudo a partir de agora )
const connectToDb = require('./database/db');

// Uso de Middleware _____________________________________________________________________________________________

//express.use ativa middleware. 
//express.static toma uma string de caminho como argumento e torna seu conteúdo disponível estaticamente (acessível por URL).
//__dirname é o diretório atual.
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'ejs'); //atribuição do tipo de arquivo a ser buscado (.ejs)
app.use(routes); //utiliza as rotas.

//Conexão com Banco de Dados _____________________________________________________________________________________
connectToDb();

// Escutando Porta _______________________________________________________________________________________________
const port = 3000;
app.listen(port, ()=>{console.log(`<!> Rodando em porta ${port} (http://localhost:${port})`);}); // ele vai rodar num servidor local na maquina, por enquanto

// MANEIRA DE ACESSAR: no terminal, digitar "npm start", e depois ir no navegador e digitar "localhost:3000/home"