import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { FastifyInstance } from 'fastify' 

export async function createPoll(app: FastifyInstance) {
    
    app.post('/polls', async (request, reply) => {
        // Coletar corpo do request
        const createPollBody = z.object({
            title: z.string(),
            options: z.array(z.string()),
        })

        const { title, options } = createPollBody.parse(request.body)

        // Criar o poll
        const poll = await prisma.poll.create({
            data:{
                title,
                options: {
                    createMany: {
                        data: options.map(option => {
                            return { title: option }
                        }),
                    }
                },
            }
        })
        
        // Responder com o ID do poll
        return reply.status(201).send({ pollId: poll.id })
    })
}