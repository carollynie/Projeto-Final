const express = require("express")
const router = express.Router()
const professor = require("../controllers/professoresController")

// Create
// Rota que recebe um novo cadastro de professor ou professora particular, e  retorna o cadastro.
router.post("/", professor.criar)

// Read
// Rota que retorna uma lista com todas as pessoas cadastradas para dar aulas na plataforma
router.get("/", professor.verTodos)

// Rota que retorna os detalhes sobre um professor, baseado no seu id.
router.get("/:id", professor.verUm)

// Rota que retorna os professores que ensinam uma matéria desejada.
//router.get("/materia/", professor.verMateria)

// Rota que retorna a localidade dos professores
//router.get("/localidade/", professor.verLocalidade)

// Rota que retorna os professores que ensinam pelas modalidades desejadas, sendo as opções: ead, presencial e chat
//router.get("/modalidade/", professor.verModalidade)

// Rota que retorna os professores que oferecem aulas com o preço médio ou menor ao digitado
//router.get("/valor/", professor.verValor)

//Update
// PUT /professor/:id
// Rota que atualiza o cadastro do professor ou professora na plataforma.
router.put("/:id", professor.atualizar)

//Delete
// Rota que deleta um cadastro de professor
router.delete("/:id", professor.apagar)


module.exports = router