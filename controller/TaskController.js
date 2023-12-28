//TaskController.js -------------------------------------------------------------------------------------------
// Armazenará as diferentes funções que lidam com requisições e respostas.
// Este módulo é utilizado pelo roteador (routes.js) para executar as funções no momento apropriado.
//-------------------------------------------------------------------------------------------------------------

// Importações __________________________________________________
const tarefa = require('../models/Tarefa');
const usuario = require('../models/Usuario');

// Funções ______________________________________________________

//Caminho Padrão
const getAll = async (req, res) => 
{
    //await tarefa.deleteMany({}); //Apagando tudo
    
    try
    {
       const tarefas = await tarefa.find();
       const usuarios = await usuario.find();
      // console.log(usuarios);
       res.render("index", {tarefas, usuarios}); //renderiza o index.ejs, buscando-o em "/views"
       //o segundo parâmetro inclui o tarefa.find(), que busca na coleção o que corresponde aos critérios dos parâmetros (nesse caso, sem filtros).
    }
    catch(error)
    {
        console.log(`<e> Erro durante carregamento de página principal: ${error}`);
        return res.status(500).send({error: error.message});
    }
}
const diaEmMiliseg = 24 * 60 * 60 * 1000;
const getFiltrado = async(req,res)=>
{
    let {filtro, valor} = req.params;
    try
    {
       let tarefas;
       switch(filtro)
       {
            case 'filtro-nome': //Por Nome
                tarefas = await tarefa.find({nome:{$eq: valor} });
                break;
            case 'filtro-data': //Por Data
                tarefas = await tarefa.find({prazo: {$lt: new Date(valor).getTime() + diaEmMiliseg}});
                break;
            case 'filtro-atribuicao': //Por Atribuição
                tarefas = await tarefa.find({atribuicao: {$eq: valor}});
                break;
            case 'filtro-autor': //Por Ator
                tarefas = await tarefa.find({autor: {$eq: valor}})
       }
       const usuarios = await usuario.find();

       res.render("index", {tarefas, usuarios});
    }
    catch(error)
    {
        console.log(`<e> Erro durante carregamento de página principal: ${error}`);
        return res.status(500).send({error: error.message});
    }
}

//Criação de Tarefa (POST)s

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
                estado: 'afazer',
                dataCriacao: Date.now(),
                ultimaModificacao: Date.now(),
                prazo: new Date(body.prazo).getTime() + diaEmMiliseg, //o dia extra funciona como correção
                atribuicao: body.atribuicao
            });

        //Redirecionando para página principal
        res.redirect('/');
    }
    catch(error)
    {
        console.log(`<e> ${error}`);
        res.status('500').send({error: error.message});
    }

};

//Modificando Tarefa
const estados = ['bloqueado', 'afazer', 'fazendo', 'finalizado'];
const modificar = async (req, res) =>
{
    body = req.body;
    try{
        //Modificando tarefa
        if(estados.includes(body.estado))
            await tarefa.updateOne({nome: {$eq: body.nome}}, {$set: {estado: body.estado, ultimaModificacao: Date.now(), bloqueio: body.bloqueio}});
        res.redirect(req.get('referer'));
    }
    catch(error)
    {
        console.log(`<e> ${error}`);
        res.status('500').send({error: error.message});
    }
}

const atualizarData = async(req, res)=>
{
    body = req.body;
    try
    {
        if(body.nome && body.data)
            await tarefa.updateOne({nome: {$eq: body.nome}}, {$set: {prazo: new Date(body.data).getTime() + diaEmMiliseg}});
        res.status(200).redirect(req.get('referer'));
    }
    catch(error)
    {
        console.log(`<e> ${error}`);
        res.status('500').send({error: error.message});
    }
}

//Exportação ____________________________________________________
module.exports = 
{
    getAll,
    adicionarTarefa,
    modificar,
    atualizarData,
    getFiltrado
}