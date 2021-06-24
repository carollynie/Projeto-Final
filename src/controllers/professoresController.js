const professoresModel = require("../models/professores.json")
const fs = require("fs")

const verTodos = (request, response) => {
    response.status(200).send(professoresModel);
}

const verUm = (request, response) => {
    const idRequerido = request.params.id
    const encontraProfessor= professoresModel.find(professor => professor.id == idRequerido)
    if (encontraProfessor == undefined) {
        response.status(404).json({
            "mensagem": "id do professor não foi encontrado"
        })
    }
    else {
        response.status(200).send(encontraProfessor)
    }
}

const criar = (request, response) => {

    const novoProfessor = {
        id: Math.random().toString(16).substr(2, 9),
        nome: request.body.nome,
        email: request.body.email,
        localidade: request.body.localidade,
        materias: request.body.materias,
        valor: request.body.valor,
        possoAjudar: request.body.possoAjudar,
        valorEspecial: request.body.valorEspecial,
        modalidade: request.body.modalidade,
        pagamento: request.body.pagamento
    }

    professoresModel.push(novoProfessor)
    fs.writeFile("./src/models/professores.json", JSON.stringify(professoresModel), "utf8", function (err) {
        if (err) {
            return response.status(424).send({ message: err })
        }
    })

    response.status(200).json(novoProfessor)
}

const atualizar = (request, response) => {
    const idRequerido = request.params.id
    const encontraProfessor = professoresModel.find(professor => professor.id == idRequerido)

    let professorAtualizar = {
        id: Math.random().toString(16).substr(2, 9),
        nome: request.body.nome,
        email: request.body.email,
        localidade: request.body.localidade,
        materias: request.body.materias,
        valor: request.body.valor,
        possoAjudar: request.body.possoAjudar,
        valorEspecial: request.body.valorEspecial,
        modalidade: request.body.modalidade,
        pagamento: request.body.pagamento
    }

    const indiceProfessorLocalizado = professoresModel.indexOf(encontraProfessor)
    professoresModel.splice(indiceProfessorLocalizado, 1, professorAtualizar)


    fs.writeFile("./src/models/professores.json", JSON.stringify(professoresModel), "utf8", function (err) {
        if (err) {
            return response.status(424).send({ message: err })
        }
    })

    response.status(200).json({
        "mensagem": "Todo o cadastro do professor foi atualizado com sucesso",
        professorAtualizar
    })
}


const apagar = (request, response) => {
    const idRequerido = request.params.id
    const encontraProfessor = professoresModel.find(professor => professor.id == idRequerido)

    if (encontraProfessor == undefined) {
        response.status(404).json({
            "mensagem": "id do professor não foi encontrado"
        })
    }

    else {
        const indiceProfessorLocalizado = professoresModel.indexOf(encontraProfessor)
        response.status(200).send({
            "mensagem": "o cadastro do professor foi deletado com sucesso"
        })

        professoresModel.splice(indiceProfessorLocalizado, 1)

        fs.writeFile("./src/models/professores.json", JSON.stringify(professoresModel), "utf8", function (err) {
            if (err) {
                return response.status(424).send({ message: err })
            }
        })
    }
}

module.exports ={
    verTodos,
    verUm,
    criar,
    atualizar,
    apagar
}

