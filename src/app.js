const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

const indexProjeto = require("./routes/index.Routes")
const professores = require("./routes/professores.Routes")
const alunos = require("./routes/alunos.Routes")

app.use('/', indexProjeto)
app.use('/professores', professores)
app.use('/alunos', alunos)

module.exports = app

