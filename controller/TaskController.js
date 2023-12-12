//TaskController.js -------------------------------------------------------------------------------------------
// Armazenará as diferentes funções que lidam com requisições e respostas.
// Este módulo é utilizado pelo roteador (routes.js) para executar as funções no momento apropriado.
//-------------------------------------------------------------------------------------------------------------

// Funções ______________________________________________________

//Caminho Padrão
const getAll = (req, res) => 
    res.render("index"); //renderiza o index.ejs, buscando-o em "/views"


//Exportação ____________________________________________________
module.exports = 
{
    getAll
}