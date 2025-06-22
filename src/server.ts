import fastify from 'fastify';

const server = fastify({ logger: true });

server.listen(
    { 
        port: 3000 
    }, 
    () =>  console.log(`Server is running on http://localhost:3000`), 
);
