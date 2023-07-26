const express = require("express")
const router = express.Router() //configuração de rota

const app = express()
const porta = 3333;

const mulheres = [
  {
    nome: 'Estrela Pereira Marques',
    imagem: 'https://avatars.githubusercontent.com/u/106935816?v=4',
    minibio: 'Desenvolvedora Back-End'

  },
  {
    nome: 'Estrela Pereira Marques',
    imagem: 'https://avatars.githubusercontent.com/u/106935816?v=4',
    minibio: 'Desenvolvedora Back-End'
  },
  {
    nome: 'Estrela Pereira Marques',
    imagem: 'https://avatars.githubusercontent.com/u/106935816?v=4',
    minibio: 'Desenvolvedora Back-End'
  }
]

function mostraMulheres(request, response) {
  response.json(mulheres)
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta: ", porta);
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta)