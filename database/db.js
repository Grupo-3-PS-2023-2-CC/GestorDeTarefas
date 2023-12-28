//Importações ___________________________________________________________________
const mongoose = require("mongoose");

// Função de Conexão ____________________________________________________________
const connectToDb = () => {
    mongoose
        .connect(
            "mongodb+srv://root:admin@todolist.se6ipyx.mongodb.net/?retryWrites=true&w=majority" //string de conexão
        )
        .then(() => console.log("<!> MongoDB Atlas CONECTADO")) //sucesso
        .catch((err) => console.log(err)); //falha
};


//Exportação _____________________________________________________________________
module.exports = connectToDb;