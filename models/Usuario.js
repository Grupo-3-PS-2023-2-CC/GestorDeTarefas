const mongoose = require('mongoose');

const usuario = new mongoose.Schema(
    {
        nome: 
        {
            type: String,
            required: true,
            unique: true
        }
    }
);

module.exports = mongoose.model("Usuario", usuario);
