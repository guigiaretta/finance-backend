import { FastifyInstance } from 'fastify';
import { categoryCreate } from '../interfaces/category.interface';    
import { categoryUseCase } from '../services/category.services';
import { req } from 'pino-std-serializers';

export async function categoryRoutes(fastify: FastifyInstance){
    const categoryUseCaseInstance = new categoryUseCase();
    fastify.post<{Body: categoryCreate}>('/categories', async (request, reply) => {
        const { name, icon } = request.body;
        try {
            const data = await categoryUseCaseInstance.createCategory(
                {name,
                icon}
            );
            return reply.send(data);
        } catch (error) {
            reply.status(500).send({ error: 'Failed to create category' });
        }
    } );
    fastify.get('/', (request, reply) => {
        reply.send({ message: 'Category route is working' });

});}