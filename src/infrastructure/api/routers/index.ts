import { FastifyInstance } from 'fastify';
import { example } from './ExampleRouter';
import { exampleGetSchema, examplePostSchema } from '../swagger';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.get('/', exampleGetSchema, example);
    application.post('/', examplePostSchema, example);
};
