import fastify from 'fastify'
import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'
import { voteOnPoll } from './routes/vote-on-poll'
import cookie from '@fastify/cookie'

const app = fastify()

// Registrando o cookie unico assinado
app.register(cookie, {
    secret: "polls-web-nlw", 
    hook: 'onRequest', 
  })

// Registrando as rotas
app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

// Verificar se está rodando
app.listen({port: 3333}).then(() => {
    console.log('HTTP server running!')
})