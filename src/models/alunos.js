const mongoose = require("mongoose")

const alunoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    criadoEm:{
        type: Date,
        required: true,
        default: new Date
    }
},
    { versionKey: false }
)

module.exports = mongoose.model("aluno", alunoSchema)