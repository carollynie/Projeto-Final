const professoresSchema = require("../models/professores")
const mongoose = require("mongoose")


const criar = async (request, response) => {

    const professor = new professoresSchema({
        id: new mongoose.Types.ObjectId(),
        nome: request.body.nome,
        email: request.body.email,
        localidade: request.body.localidade,
        materias: request.body.materias,
        valor: request.body.valor,
        possoAjudar: request.body.possoAjudar,
        valorEspecial: request.body.valorEspecial,
        modalidade: request.body.modalidade,
        pagamento: request.body.pagamento,
        criadoEm: request.body.criadoEm
    })

    try {
        const novoProfessor = await professor.save()
        response.status(201).json(novoProfessor)
    }
    catch (err) {
        response.status(500).json(
            { message: err.message }
        )
    }
}

const verTodos = async (request, response) => {
    try {
        const professores = await professoresSchema.find()
        return response.status(200).send(professores)
    }
    catch (err) {
        return response.status(500).json({
            message: err.message
        })
    }
}

const verUm = async (request, response) => {
    const professorRequerido = await professoresSchema.findById(request.params.id)
    if (professorRequerido == null) {
        response.status(404).json({
            "mensagem": "Esse professor não foi encontrado"
        })
    }
    else {
        response.status(200).send(professorRequerido)
    }
}

const verModalidade = async (request, response) => {
    try {
        const professoresModalidade = await professoresSchema.find(request.query)
        response.status(200).send(professoresModalidade)
    }
    catch (err) {
        return response.status(500).json({
            message: err.message
        })
    }

}

const verMateria = async (request, response) => {
    try {
        const professoresMateria = await professoresSchema.find(request.query)
        response.status(200).send(professoresMateria)
    }
    catch (err) {
        return response.status(500).json({
            message: err.message
        })
    }
}

const verLocalidade = async (request, response) => {
    try {
        const professoresLocalidade = await professoresSchema.find(request.query)
        response.status(200).send(professoresLocalidade)
    }
    catch (err) {
        return response.status(500).json({
            message: err.message
        })
    }
}

const verValor = async (request, response) => {
    try {
        const professores = await professoresSchema.find()
        const professoresFiltrados = professores.filter(professor => professor.valor <= request.query.valor)
        response.status(200).send(professoresFiltrados)
    }
    catch (err) {
        return response.status(500).json({
            message: err.message
        })
    }
}

const atualizar = async (request, response) => {
    const encontraProfessor = await professoresSchema.findById(request.params.id)
    if (encontraProfessor == null) {
        return response.status(404).json({ message: "Professor não encontrado" })
    }
    if (request.body.nome != null) {
        encontraProfessor.nome = request.body.nome
    }
    if (request.body.email != null) {
        encontraProfessor.email = request.body.email
    }
    if (request.body.localidade != null) {
        encontraProfessor.localidade = request.body.localidade
    }
    if (request.body.materias != null) {
        encontraProfessor.materias = request.body.materias
    }
    if (request.body.valor != null) {
        encontraProfessor.valor = request.body.valor
    }
    if (request.body.possoAjudar != null) {
        encontraProfessor.possoAjudar = request.body.possoAjudar
    }
    if (request.body.valorEspecial != null) {
        encontraProfessor.valorEspecial = request.body.valorEspecial
    }
    if (request.body.modalidade != null) {
        encontraProfessor.modalidade = request.body.modalidade
    }
    if (request.body.pagamento != null) {
        encontraProfessor.pagamento = request.body.pagamento
    }

    try {
        const professorAtualizado = await encontraProfessor.save()
        response.status(200).json(professorAtualizado)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

const apagar = async (request, response) => {
    const encontraProfessor = await professoresSchema.findById(request.params.id)
    if (encontraProfessor == null) {
        return response.status(404).json({
            message: "Professor não encontrado"
        })
    }
    try {
        await encontraProfessor.remove()
        response.status(200).json({
            message: "O cadastro do professor foi deletado com sucesso"
        })
    }
    catch (err) {
        response.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    verTodos,
    verUm,
    verModalidade,
    verMateria,
    verLocalidade,
    verValor,
    criar,
    atualizar,
    apagar
}
