const express = require('express') // Inicia o express
const router = express.Router() // configuração de rota
const cors = require('cors') // Traz o pacote cor que permite consumir essa API no front-end

const conectaBancoDeDados = require('./bancoDeDados') // ligando ao arquivo bancoDeDados
conectaBancoDeDados() // Chamando a função que conecta aao banco de dados

const Mulher = require('./mulherModel')

const app = express() //Iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 // Criando a porta

// GET
async function mostraMulheres(request, response) {
  try {
    const mulheresVindasDoBancoDeDados = await Mulher.find()

    response.json(mulheresVindasDoBancoDeDados)
  } catch (erro) {
    console.log(erro)
  }
}

// POST
async function criaMulher(request, response) {
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    biografia: request.body.biografia,
    citacao: request.body.citacao
  })

  try {
    const mulherCriada = await novaMulher.save()
    response.status(201).json(mulherCriada)
  } catch (erro) {
    console.log(erro)
  }
}

// PATH
async function corrigeMulher(request, response) {
  try {
    const mulherEncontrada = await Mulher.findById(request.params.id)

    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome
    }

    if (request.body.biografia) {
      mulherEncontrada.biografia = request.body.biografia
    }

    if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem
    }

    if (request.body.citacao) {
      mulherEncontrada.citacao = request.body.citacao
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

    response.json(mulherAtualizadaNoBancoDeDados)
  } catch (erro) {
    console.log(erro)
  }
}

// DELETE
async function deletaMulher(request, response) {
  try {
    await Mulher.findByIdAndDelete(request.params.id)
    response.json({ message: 'Mulher deletada com  sucesso!' })
  } catch (erro) {
    console.log(erro)
  }
}

app.use(router.get('/mulheres', mostraMulheres)) //Configura rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) // Configura rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) // Configura rota PATH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) // Configura rota DELETE /mulheres

// PORTA
function mostraPorta() {
  console.log('Servidor criado e rodando na porta: ', porta)
}

app.listen(porta, mostraPorta) // Servidor ouvindo a porta
