//Tarefa.js -------------------------------------------------------------------------
// Possui o schema (modelo) correspondente à estrutura da coleção (objeto) armazenada
//no banco de dados.
// ----------------------------------------------------------------------------------

// Importação _______________________________________________________________________
const mongoose = require('mongoose');

// Schema ___________________________________________________________________________

//Criaremos um novo objeto do tipo schema.  O construtor receberá as configurações.
const prioridades = ['alta', 'media', 'baixa'];
const estados = ['afazer', 'fazendo', 'finalizado'];
const tarefa = new mongoose.Schema
(
    //Objeto de configurações
    {
        //Nome (Título)
        nome: {type: String, required: true, unique: true},
        //Descrição
        descricao: {type: String, required: true},
        // Prioridade
        prioridade: {
            type: String, 
            required: true, 
            validate: (prioridade) => prioridades.includes(prioridade)
        },
        //Autor
        autor: {type: String, required: true},
        //Data de Criação
        dataCriacao: {type: Date, required: false, default: Date.now()},
        //Última Modificação
        ultimaModificacao: {type: Date, required: false, default: Date.now()},
        //Prazo
        prazo: {type: Date, required: true},
        //Estado (a fazer, fazendo ou finalizado)
        estado: {
            type: String, 
            required: true, 
            validade: (estado)=>estados.includes(estado)
        }
    }
)

// Exportação _______________________________________________________________________
module.exports = mongoose.model("Tarefa", tarefa);