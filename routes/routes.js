//Routes ------------------------------------------------------------------------------------------------------
//Será o módulo responsável por exportar o .Router(), após configurar as diferentes rotas.
//Cada rota é configurada de forma que uma função correspondente do controlador (taskController) é ativada.
//-------------------------------------------------------------------------------------------------------------

// Importação de Módulos __________________________________________________
const routes = require("express").Router();
const taskController = require('../controller/TaskController')
const userController = require('../controller/UserController');

// Caminhos (URLs) ________________________________________________________

//Caminho Padrão
routes.get('/', taskController.getAll);
// Sobre função get: possui dois parametros ( nome da rota(onde vai acessar) , função de callback chamada pela get)

//Criação de Tarefas
routes.post('/criar', taskController.adicionarTarefa);
//no index.ejs, pode ser ativado por um "submit" num <form action="[caminho]"" method="post"></form>
//<!-- Agora que as tarefas são renderizadas (no controlador), pode-se usá-las no .ejs, em <% ... %> -->
//<!-- Para mostrar conteúdo, usa-se <%= [conteúdo] %> -->

//Atualização de Posição
routes.post('/modificar', taskController.modificar);

//Registrando Usuário
routes.post('/registrar', userController.registrar);

// Exportação _____________________________________________________________
module.exports = routes;