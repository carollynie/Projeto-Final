const alunosModel = require("../models/alunos.json")
const fs = require("fs")


const ver = (request, response) => {
    const idRequerido = request.params.id
    const encontraAluno = alunosModel.find(aluno => aluno.id == idRequerido)
    if (encontraAluno == undefined) {
        response.status(404).json({
            "mensagem": "id do aluno não foi encontrado"
        })
    }
    else {
        response.status(200).send(encontraAluno)
    }
}

const criar = (request, response) => {

    const novoAluno = {
        id: Math.random().toString(16).substr(2, 9),
        nome: request.body.nome,
        email: request.body.email,
    }

    alunosModel.push(novoAluno)
    fs.writeFile("./src/models/alunos.json", JSON.stringify(alunosModel), "utf8", function (err) {
        if (err) {
            return response.status(424).send({ message: err })
        }
    })

    response.status(200).json(novoAluno)
}

const atualizar = (request, response) => {
    const idRequerido = request.params.id
    const encontraAluno = alunosModel.find(aluno => aluno.id == idRequerido)

    let alunoAtualizar = {
        nome: request.body.nome,
        email: request.body.email
    }

    const indiceAlunoLocalizado = alunosModel.indexOf(encontraAluno)
    alunosModel.splice(indiceAlunoLocalizado, 1, alunoAtualizar)


    fs.writeFile("./src/models/alunos.json", JSON.stringify(alunosModel), "utf8", function (err) {
        if (err) {
            return response.status(424).send({ message: err })
        }
    })

    response.status(200).json({
        "mensagem": "Todo o cadastro do aluno foi atualizado com sucesso",
        alunoAtualizar
    })
}


const apagar = (request, response) => {
    const idRequerido = request.params.id
    const encontraAluno = alunosModel.find(aluno => aluno.id == idRequerido)

    if (encontraAluno == undefined) {
        response.status(404).json({
            "mensagem": "id do aluno não foi encontrado"
        })
    }

    else {
        const indiceAlunoLocalizado = alunosModel.indexOf(encontraAluno)
        response.status(200).send({
            "mensagem": "o cadastro do aluno foi deletado com sucesso"
        })

        alunosModel.splice(indiceAlunoLocalizado, 1)

        fs.writeFile("./src/models/alunos.json", JSON.stringify(alunosModel), "utf8", function (err) {
            if (err) {
                return response.status(424).send({ message: err })
            }
        })
    }
}

module.exports ={
    ver,
    criar,
    atualizar,
    apagar
}