const mongoose = require("mongoose")

const professorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    localidade: {
        type: String,
        required: true
    },
    materias: {
        type: Array,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    possoAjudar: {
        type: Array,
        required: true
    },
    valorEspecial: {
        type: Number,
        required: true
    },
    modalidade: {
        type: Array,
        required: true
    },
    pagamento: {
        type: Array,
        required: true
    },
    criadoEm: {
        type: Date,
        required: true,
        default: new Date
    }
},
    { versionKey: false }
)

module.exports = mongoose.model("professor", professorSchema)
