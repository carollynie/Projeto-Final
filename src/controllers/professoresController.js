const professoresModel = require("../models/professores.json")
const fs = require("fs")

const verTodos = (request, response) => {
    response.status(200).send(professoresModel);
}

const verUm = (request, response) => {
    const idRequerido = request.params.id
    const encontraProfessor = professoresModel.find(professor => professor.id == idRequerido)
    if (encontraProfessor == undefined) {
        response.status(404).json({
            "mensagem": "id do professor não foi encontrado"
        })
    }
    else {
        response.status(200).send(encontraProfessor)
    }
}

const verModalidade = (request, response) => {
    const modalidadeRequisitada = request.query.modalidade
    let novaListaModalidade = []

    professoresModel.forEach(professor => {
        let listaEmModalidade = professor.modalidade
        for (item of listaEmModalidade) {
            //SE o item for igual a modalidade da requisição E SE o professor.modalidade tiver esse item
            if (item.includes(modalidadeRequisitada) && professor.modalidade.includes(item)) {
                novaListaModalidade.push(professor)
            }
        }
    })
    if (novaListaModalidade.length == 0) {
        response.status(404).json({
            "message": "Modalidade de aula não encontrada"
        })
    }
    else {
        response.status(200).send(novaListaModalidade)
    }
}

const verMateria = (request, response) => {
    const materiaRequisitada = request.query.materias
    let novaListaMaterias = []

    professoresModel.forEach(professor => {
        let listaEmMaterias = professor.materias
        for (item of listaEmMaterias) {
            //SE o item for igual a materia da requisição E SE o professor.materias tiver esse item
            if (item.includes(materiaRequisitada) && professor.materias.includes(item)) {
                novaListaMaterias.push(professor)
            }
        }
    })
    if (novaListaMaterias.length == 0) {
        response.status(404).json({
            "message": "Matéria solicitada não encontrada"
        })
    }
    else {
        response.status(200).send(novaListaMaterias)
    }
}

const verLocalidade = (request, response) => {
    const localidadeRequisitada = request.query.localidade
    let novaListaLocalidade = []

    professoresModel.forEach(professor => {
        if (professor.localidade == localidadeRequisitada) {
            novaListaLocalidade.push(professor)
        }
    })
    if (novaListaLocalidade.length == 0) {
        response.status(404).json({
            "message": "Localidade solicitada não encontrada"
        })
    }
    else {
        response.status(200).send(novaListaLocalidade)
    }
}

const verValor = (request, response) => {
    const valorRequerido = request.query.valor
    let novaListaValor = []

    professoresModel.forEach(professor => {
        if (professor.valor <= valorRequerido) {
            novaListaValor.push(professor)
        }
    })
    if (novaListaValor.length == 0) {
        response.status(404).json({
            "message": "Não há aulas disponíveis abaixo desse valor"
        })
    }
    else {
        response.status(200).send(novaListaValor)
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
