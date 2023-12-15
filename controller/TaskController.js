//TaskController.js -------------------------------------------------------------------------------------------
// Armazenará as diferentes funções que lidam com requisições e respostas.
// Este módulo é utilizado pelo roteador (routes.js) para executar as funções no momento apropriado.
//-------------------------------------------------------------------------------------------------------------

// Importações __________________________________________________
const tarefa = require('../models/Tarefa');

// Funções ______________________________________________________

//Caminho Padrão
const getAll = async (req, res) => 
{
    try
    {
        const tarefas = await tarefa.find();
       res.render("index", {tarefas}); //renderiza o index.ejs, buscando-o em "/views"
       //o segundo parâmetro inclui o tarefa.find(), que busca na coleção o que corresponde aos critérios dos parâmetros (nesse caso, sem filtros).
    }
    catch(error)
    {
        console.log(`<e> Erro durante carregamento de página principal: ${error}`);
        return res.status(500).send({error: error.message});
    }
}

//Criação de Tarefa (POST)
const adicionarTarefa = async (req, res)=>
{
    const body = req.body;
    if(!body) return res.redirect('/'); //Se não houver corpo, redirecionar para página principal
    try
    {
        //Criando tarefa no banco de dados, a partir da schema de tarefa.
        await tarefa.create(
            {
                nome: body.nome,
                autor: body.autor,
                descricao: body.descricao,
                estado: body.estado,
                prioridade: body.prioridade,
                dataCriacao: Date.now(),
                ultimaModificacao: Date.now(),
                prazo: body.prazo
            })
        
        //Redirecionando para página principal
        res.redirect('/');
    }
    catch(error)
    {
        console.log(`<e> ${error}`);
        res.status('500').send({error: error.message});
    }

};


//Exportação ____________________________________________________
module.exports = 
{
    getAll,
    adicionarTarefa
}