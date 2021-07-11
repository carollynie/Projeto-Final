# Descrição do Projeto
Essa é uma API em que podemos oferecer aulas particulares. O diferencial desta plataforma para as que já existem no mercado é a possibilidade de oferecermos aulas com valores especiais para pessoas em vulnerabilidade social.
O intuito é que os professores possam ensinar para adquirir uma renda extra e, caso se sintam confortáveis, oferecerem aulas mais baratas para pessoas que queiram ajudar. 
Para os alunos, essa plataforma possibilitará encontrar ajuda no que precisarem, com a possibilidade de encontrarem aulas por videochamada, presenciais e até mesmo via chat, contemplando assim pessoas que possuam deficiência auditiva.


## Estrutura da API - alunos
``` js
{
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    criadoEm:{
        type: Date,
        required: true,
        default: new Date
    }
}
```

## Estrutura da API - professores
``` js
{
       
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    localidade: {
        type: String,
        required: true
    },
    materias: {
        type: Array,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    possoAjudar: {
        type: Array,
        required: true
    },
    valorEspecial: {
        type: Number,
        required: true
    },
    modalidade: {
        type: Array,
        required: true
    },
    pagamento: {
        type: Array,
        required: true
    },
    criadoEm: {
        type: Date,
        required: true,
        default: new Date
    }
}
```

## Rotas (/)
Rota de apresentação do projeto

## Rotas (/alunos/)

### [POST]/alunos/
Realiza o cadastro de um aluno

``` json
{
        "nome": "string",
        "email": "string",
}
```

### [GET]/alunos/:id
Retorna o cadastro de um aluno a partir do seu id

### [PUT]/alunos/:id
Atualiza o cadastro do id solicitado

### [DELETE]/alunos/:id
Apaga um cadastro pelo id solicitado

## Rotas (/professores/)

### [POST]/professores/
Realiza o cadastro de um professor
``` json
{
        "nome": "string",
        "descricao":"string",
        "email": "string",
        "localidade": "string",
        "materias": "array",
        "valor": "number",
        "possoAjudar": "array",
        "valorEspecial": "array",
        "modalidade": "array",
        "pagamento": "array",
}
```

### [GET]/professores/
Mostra todos os professores

### [GET]/professores/:id
Retorna o cadastro de um professor a partir do seu id

### [GET]/professores/modalidade
Retorna o cadastro dos professores que atendem a modalidade desejada
*query params - key: modalidade*

### [GET]/professores/materia
Retorna o cadastro dos professores que atendem a área de estudo desejada
*query params - key: materia*

### [GET]/professores/localidade
Retorna o cadastro dos professores que atendem a localidade desejada
*query params - key: localidade*

### [GET]/professores/valor
Retorna o cadastro dos professores que atendem o valor igual ou menor ao desejado
*query params - key: valor*

### [PUT]/professores/:id
Atualiza um cadastro pelo id solicitado
``` json
{
        "nome": "string",
        "descricao":"string",
        "email": "string",
        "localidade": "string",
        "materias": "array",
        "valor": "number",
        "possoAjudar": "array",
        "valorEspecial": "array",
        "modalidade": "array",
        "pagamento": "array",
}
```

### [DELETE]/professores/:id
Apaga um cadastro pelo id solicitado


