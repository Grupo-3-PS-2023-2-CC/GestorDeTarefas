//Routes ------------------------------------------------------------------------------------------------------
//Será o módulo responsável por exportar o .Router(), após configurar as diferentes rotas.
//Cada rota é configurada de forma que uma função correspondente do controlador (taskController) é ativada.
//-------------------------------------------------------------------------------------------------------------

// Importação de Módulos __________________________________________________
const routes = require("express").Router();
const taskController = require('../controller/TaskController')

// Caminhos (URLs) ________________________________________________________

//Caminho Padrão
routes.get('/', taskController.getAll);
// Sobre função get: possui dois parametros ( nome da rota(onde vai acessar) , função de callback chamada pela get)

// Exportação _____________________________________________________________
module.exports = routes;