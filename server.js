const app = require ("./src/app")
const PORT = process.env.PORT || 4015 // Mudança na porta para integração com heroku

app.listen(PORT,(request,response)=>{
    console.log(`Liberdu está rodando na porta ${PORT} !!`)
})