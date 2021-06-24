const express = require("express")
const router = express.Router()
const aluno = require("../controllers/alunosController")


//Create
//Rota que recebe o cadastro de um novo estudante, e  retorna o cadastro.
router.post("/", aluno.criar)

//Read
router.get("/:id", aluno.ver)


//Update
// Rota que atualiza o cadastro da aluna ou aluno  na plataforma.
router.put("/:id", aluno.atualizar)

//Delete
//Rota que deleta um cadastro de aluno
router.delete("/:id", aluno.apagar)

module.exports = router

