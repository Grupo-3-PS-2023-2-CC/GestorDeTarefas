const usario = require('../models/Usuario');

//Registrando Cliente
const registrar = async (req, res)=>
{   
    const {nome} = req.body;
    try
    {
        await usario.create({nome: nome});
        res.redirect('/');
    }
    catch(error){
        console.log(`<e> Erro ao salvar usuário: ${error}`);
        res.status('500').send({error: error.message});
    }

}

module.exports = 
{
    registrar
}