import fastify from 'fastify'
import type { FastifyInstance } from 'fastify'

const app: FastifyInstance = fastify({ logger: false });

app.listen(
    {
        port: 3100,
    },
    () => console.log('Server Runing...'),
);

