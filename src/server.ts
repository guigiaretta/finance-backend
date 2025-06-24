import fastify from 'fastify';
import { categoryRoutes } from './routes/category.routes';
import { bankRoutes } from './routes/bank.routes';
import { transactionRoutes } from './routes/transaction.routes';

const server = fastify({ logger: true });

server.register(categoryRoutes, {
    prefix: '/categories',
});

server.register(bankRoutes, {
    prefix: '/banks',
});
server.register(transactionRoutes, {
    prefix: '/transactions',    
});

server.listen(
    { 
        port: 3000 
    }, 
    () =>  console.log(`Server is running on http://localhost:3000`), 
);
