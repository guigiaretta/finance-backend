import fastify from 'fastify';
import { categoryRoutes } from './routes/category.routes';
import { bankRoutes } from './routes/bank.routes';

const server = fastify({ logger: true });

server.register(categoryRoutes, {
    prefix: '/categories',
});

server.register(bankRoutes, {
    prefix: '/banks',
});

server.listen(
    { 
        port: 3000 
    }, 
    () =>  console.log(`Server is running on http://localhost:3000`), 
);
