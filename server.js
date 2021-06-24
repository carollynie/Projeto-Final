const app = require ("./src/app")
const PORT = 4015

app.listen(PORT,(request,response)=>{
    console.log(`Liberdu está rodando na porta ${PORT} !!`)
})