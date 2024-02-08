import fastify from 'fastify'
import cookie from '@fastify/cookie'
import websocket from '@fastify/websocket'
import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'
import { voteOnPoll } from './routes/vote-on-poll'
import { pollResults } from './ws/poll-results'

const app = fastify()

// Registrando o cookie unico assinado
app.register(cookie, {
    secret: "polls-web-nlw", 
    hook: 'onRequest', 
  })

// Registrando o websocket
app.register(websocket)

// Registrando as rotas
app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

// Registrando a rota WebSocket
app.register(pollResults)

// Verificar se está rodando
app.listen({port: 3333}).then(() => {
    console.log('HTTP server running!')
})