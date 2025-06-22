import fastify from 'fastify';
import { categoryRoutes } from './routes/category.routes';

const server = fastify({ logger: true });

server.register(categoryRoutes, {
    prefix: '/categories', });

server.listen(
    { 
        port: 3000 
    }, 
    () =>  console.log(`Server is running on http://localhost:3000`), 
);
