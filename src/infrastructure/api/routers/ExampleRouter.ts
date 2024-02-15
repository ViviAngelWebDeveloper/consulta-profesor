import { ExampleAppService } from '@application/services';
import { ConsultarAppService } from '@application/services/ConsultarAppService';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { datoVivi } from '@domain/entities';
import { FastifyRequest, FastifyReply } from 'fastify';

export const example = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const exampleService:ExampleAppService = DEPENDENCY_CONTAINER.get(ExampleAppService);
    const response = await exampleService.example();
    return reply.send({ ...response, id: req.id });
};

export const consultar = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const exampleService:ConsultarAppService = DEPENDENCY_CONTAINER.get(ConsultarAppService);
    const response = await exampleService.example(req.body as datoVivi);
    return reply.send({ ...response, id: req.id });
};