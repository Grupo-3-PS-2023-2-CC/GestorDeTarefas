//Tarefa.js -------------------------------------------------------------------------
// Possui o schema (modelo) correspondente à estrutura da coleção (objeto) armazenada
//no banco de dados.
// ----------------------------------------------------------------------------------

// Importação _______________________________________________________________________
const mongoose = require('mongoose');

// Schema ___________________________________________________________________________

//Criaremos um novo objeto do tipo schema.  O construtor receberá as configurações.
const tarefa = new mongoose.Schema
(
    //Objeto de configurações
    {
        //Nome (Título)
        nome: {type: String, required: true},
        //Descrição
        descricao: {type: String, required: true},
        //Autor
        autor: {type: String, required: true},
        //Data de Criação
        dataCriacao: {type: Date, required: false, default: Date.now()},
        //Última Modificação
        ultimaModificao: {type: Date, required: false, default: Date.now()},
        //Prazo
        prazo: {type: Date, required: true, default: Date.now()}
        //Estado (a fazer, fazendo ou finalizado)
    }
)

// Exportação _______________________________________________________________________
module.exports = mongoose.model("Tarefa", tarefa);