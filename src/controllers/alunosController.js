const alunosSchema = require("../models/alunos")
const mongoose = require("mongoose")

const ver = async (request, response) => {
    const alunoRequerido = await alunosSchema.findById(request.params.id)
    if (alunoRequerido == null) {
        response.status(404).json({
            "mensagem": "Esse aluno não foi encontrado"
        })
    }
    else {
        response.status(200).send(alunoRequerido)
    }
}

const criar = async (request, response) => {
    const aluno = new alunosSchema({
        _id: new mongoose.Types.ObjectId(),
        nome: request.body.nome,
        email: request.body.email
    })

    try {
        const novoAluno = await aluno.save()
        response.status(201).json(novoAluno)
    }
    catch (err) {
        response.status(500).json(
            { message: err.message }
        )
    }
}

const atualizar = async (request, response) => {
    const encontraAluno = await alunosSchema.findById(request.params.id)
    if (encontraAluno == null) {
        return response.status(404).json({ message: "Aluno não encontrado" })
    }
    if (request.body.nome != null) {
        encontraAluno.nome = request.body.nome
    }
    if (request.body.email != null) {
        encontraAluno.email = request.body.email
    }
    try {
        const alunoAtualizado = await encontraAluno.save()
        response.status(200).json(alunoAtualizado)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

const apagar = async (request, response) => {
    const encontraAluno = await alunosSchema.findById(request.params.id)
    if (encontraAluno == null) {
        return response.status(404).json({
            message: "Aluno não encontrado"
        })
    }
    try {
        await encontraAluno.remove()
        response.status(200).json({
            message: "O cadastro do aluno foi deletado com sucesso"
        })
    }
    catch (err) {
        response.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    ver,
    criar,
    atualizar,
    apagar
}